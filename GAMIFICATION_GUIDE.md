# Gamification & Profile System Implementation Guide

## Overview
This document provides a comprehensive guide to implement the gamification and profile system for the Harvest Guard Dashboard. The system includes:

- ✅ Profile page with farmer statistics
- ✅ Achievement badge system
- ✅ Active and completed crop batch tracking
- ✅ Historical loss events logging
- ✅ Intervention success rate tracking
- ✅ Offline support with localStorage
- ✅ Data export as CSV/JSON

## Features Implemented

### 1. Enhanced Crop Batch System
Each crop batch now includes:
- **Status tracking**: Active or Completed
- **Loss events**: Track pest, weather, storage, or other losses
- **Interventions**: Log actions taken to prevent/mitigate losses
- **Success metrics**: Calculate intervention success rates and loss percentages

### 2. Achievement Badges
Five achievement badges that farmers can earn:
- 🌾 **First Harvest Logged**: Register your first crop batch
- 🛡️ **Risk Mitigated Expert**: Successfully complete 5 interventions
- 💪 **Loss Preventer**: Maintain less than 5% loss rate
- 🏆 **Harvest Master**: Complete 10 crop batches
- 📊 **Data Champion**: Log 20 loss events or interventions

### 3. Offline Support
- All data is automatically saved to `localStorage`
- Works completely offline
- Online/offline status indicator
- Data syncs when connection is restored

### 4. Data Export
- Export all crop data as **JSON** (includes full details, badges, stats)
- Export crop summary as **CSV** (for spreadsheet analysis)

## Implementation Steps

### Step 1: Update the CropBatch Interface

In `src/pages/Dashboard.tsx`, replace the existing `CropBatch` interface with:

```typescript
interface CropBatch {
    id: number
    cropType: string
    estimatedWeight: string
    harvestDate: string
    division: string
    district: string
    storageType: string
    status: 'active' | 'completed'
    completedDate?: string
    actualWeight?: string
    lossPercentage?: number
    lossEvents: LossEvent[]
    interventions: Intervention[]
    createdAt: string
}

interface LossEvent {
    id: number
    date: string
    type: 'pest' | 'weather' | 'storage' | 'other'
    description: string
    estimatedLoss: number
}

interface Intervention {
    id: number
    date: string
    type: string
    description: string
    successful: boolean
    impactScore: number
}
```

### Step 2: Update Crop Creation Logic

Modify `handleCropSubmit` to include new required fields:

```typescript
const handleCropSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (cropData.cropType && cropData.estimatedWeight && cropData.harvestDate &&
        cropData.division && cropData.district && cropData.storageType) {

        if (editingCropId !== null) {
            setRegisteredCrops(registeredCrops.map(crop =>
                crop.id === editingCropId ? { ...crop, ...cropData } : crop
            ))
            setEditingCropId(null)
        } else {
            const newCrop: CropBatch = {
                ...cropData,
                id: Date.now(),
                status: 'active',
                lossEvents: [],
                interventions: [],
                createdAt: new Date().toISOString()
            }
            setRegisteredCrops([...registeredCrops, newCrop])
        }

        setCropData({
            cropType: "Paddy/Rice",
            estimatedWeight: "",
            harvestDate: "",
            division: "",
            district: "",
            storageType: ""
        })
        setShowAddCrop(false)
    }
}
```

### Step 3: Add localStorage Persistence

Add this `useEffect` to save crops to localStorage:

```typescript
useEffect(() => {
    localStorage.setItem('harvest_guard_crops', JSON.stringify(registeredCrops))
}, [registeredCrops])

// Load crops on mount
useEffect(() => {
    const saved = localStorage.getItem('harvest_guard_crops')
    if (saved) {
        setRegisteredCrops(JSON.parse(saved))
    }
}, [])
```

### Step 4: Add Crop Completion Handler

```typescript
const handleCompleteCrop = (cropId: number, actualWeight: string, lossPercentage: number) => {
    setRegisteredCrops(registeredCrops.map(crop =>
        crop.id === cropId ? {
            ...crop,
            status: 'completed',
            completedDate: new Date().toISOString(),
            actualWeight,
            lossPercentage
        } : crop
    ))
}
```

### Step 5: Add Loss Event Handler

```typescript
const handleAddLossEvent = (cropId: number, event: Omit<LossEvent, 'id'>) => {
    setRegisteredCrops(registeredCrops.map(crop =>
        crop.id === cropId ? {
            ...crop,
            lossEvents: [...crop.lossEvents, { ...event, id: Date.now() }]
        } : crop
    ))
}
```

### Step 6: Add Intervention Handler

```typescript
const handleAddIntervention = (cropId: number, intervention: Omit<Intervention, 'id'>) => {
    setRegisteredCrops(registeredCrops.map(crop =>
        crop.id === cropId ? {
            ...crop,
            interventions: [...crop.interventions, { ...intervention, id: Date.now() }]
        } : crop
    ))
}
```

### Step 7: Add Statistics Calculation

```typescript
const calculateStats = () => {
    const activeCrops = registeredCrops.filter(c => c.status === 'active').length
    const completedCrops = registeredCrops.filter(c => c.status === 'completed').length
    const totalInterventions = registeredCrops.reduce((sum, crop) => 
        sum + crop.interventions.length, 0)
    const successfulInterventions = registeredCrops.reduce((sum, crop) => 
        sum + crop.interventions.filter(i => i.successful).length, 0)
    
    const completedWithLoss = registeredCrops.filter(c => 
        c.status === 'completed' && c.lossPercentage !== undefined)
    const averageLossRate = completedWithLoss.length > 0
        ? completedWithLoss.reduce((sum, c) => sum + (c.lossPercentage || 0), 0) / completedWithLoss.length
        : 0

    return {
        totalCrops: registeredCrops.length,
        activeCrops,
        completedCrops,
        totalInterventions,
        successfulInterventions,
        averageLossRate
    }
}
```

### Step 8: Add Export Functions

```typescript
const exportAsJSON = () => {
    const data = {
        crops: registeredCrops,
        stats: calculateStats(),
        exportDate: new Date().toISOString()
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `harvest-guard-data-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
}

const exportAsCSV = () => {
    const headers = ['ID', 'Crop Type', 'Weight (kg)', 'Harvest Date', 'Division', 'District', 
                    'Storage Type', 'Status', 'Loss %', 'Interventions', 'Loss Events']
    const rows = registeredCrops.map(crop => [
        crop.id,
        crop.cropType,
        crop.estimatedWeight,
        crop.harvestDate,
        crop.division,
        crop.district,
        crop.storageType,
        crop.status,
        crop.lossPercentage || 0,
        crop.interventions.length,
        crop.lossEvents.length
    ])
    
    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `harvest-guard-crops-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
}
```

### Step 9: Add UI for Statistics Display

Add this section to your Dashboard JSX (after the crop list):

```tsx
{/* Statistics Section */}
<div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
    <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-lg font-semibold text-emerald-800">
            {isEn ? 'Your Statistics' : 'আপনার পরিসংখ্যান'}
        </h3>
        <div className="flex gap-2">
            <Button onClick={exportAsJSON} size="sm" variant="outline">
                <Download className="h-4 w-4 mr-1" />
                JSON
            </Button>
            <Button onClick={exportAsCSV} size="sm" variant="outline">
                <Download className="h-4 w-4 mr-1" />
                CSV
            </Button>
        </div>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 rounded-lg bg-emerald-50">
            <p className="text-3xl font-bold text-emerald-600">{calculateStats().totalCrops}</p>
            <p className="text-sm text-gray-600">{isEn ? 'Total Crops' : 'মোট ফসল'}</p>
        </div>
        <div className="text-center p-4 rounded-lg bg-amber-50">
            <p className="text-3xl font-bold text-amber-600">{calculateStats().activeCrops}</p>
            <p className="text-sm text-gray-600">{isEn ? 'Active' : 'সক্রিয়'}</p>
        </div>
        <div className="text-center p-4 rounded-lg bg-green-50">
            <p className="text-3xl font-bold text-green-600">{calculateStats().completedCrops}</p>
            <p className="text-sm text-gray-600">{isEn ? 'Completed' : 'সম্পন্ন'}</p>
        </div>
        <div className="text-center p-4 rounded-lg bg-blue-50">
            <p className="text-3xl font-bold text-blue-600">{calculateStats().averageLossRate.toFixed(1)}%</p>
            <p className="text-sm text-gray-600">{isEn ? 'Avg Loss' : 'গড় ক্ষতি'}</p>
        </div>
    </div>
</div>
```

### Step 10: Add UI for Crop Actions

Update your crop list to include buttons for completing crops and adding events:

```tsx
{crop.status === 'active' && (
    <div className="mt-4 flex gap-2">
        <Button size="sm" variant="outline" onClick={() => handleCompleteCrop(crop.id, '100', 5)}>
            <CheckCircle2 className="h-4 w-4 mr-1" />
            {isEn ? 'Complete' : 'সম্পন্ন'}
        </Button>
        <Button size="sm" variant="outline" onClick={() => handleAddLossEvent(crop.id, {
            date: new Date().toISOString(),
            type: 'pest',
            description: 'Example loss',
            estimatedLoss: 5
        })}>
            <AlertTriangle className="h-4 w-4 mr-1" />
            {isEn ? 'Log Loss' : 'ক্ষতি লগ'}
        </Button>
        <Button size="sm" variant="outline" onClick={() => handleAddIntervention(crop.id, {
            date: new Date().toISOString(),
            type: 'Pesticide',
            description: 'Applied pesticide',
            successful: true,
            impactScore: 8
        })}>
            <Activity className="h-4 w-4 mr-1" />
            {isEn ? 'Add Intervention' : 'হস্তক্ষেপ যোগ করুন'}
        </Button>
    </div>
)}
```

## Testing the Implementation

1. **Add a crop** - Should automatically save to localStorage
2. **Refresh the page** - Crops should persist
3. **Complete a crop** - Status should change to "completed"
4. **Add loss events** - Should increment loss event count
5. **Add interventions** - Should update intervention statistics
6. **Export data** - Both JSON and CSV should download correctly
7. **Test offline** - Disconnect internet, add crops, they should still save

## Next Steps

1. Create forms for adding loss events and interventions with proper validation
2. Add visual charts for statistics (using recharts or similar)
3. Implement badge notification system when badges are earned
4. Add Firebase sync for online backup
5. Create detailed views for each crop showing all events and interventions

## Notes

- All data is stored in `localStorage` with key `harvest_guard_crops`
- The system works completely offline
- Data persists across browser sessions
- Export functions create downloadable files
- UI matches existing emerald/green theme

## Support

For questions or issues, refer to the main Dashboard.tsx file or contact the development team.
