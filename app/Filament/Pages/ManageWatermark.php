<?php

namespace App\Filament\Pages;

use Filament\Forms\Components\ColorPicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Pages\Page;

class ManageWatermark extends Page implements HasForms
{

    protected static ?string $navigationIcon = 'heroicon-o-photo';

    protected static string $view = 'filament.pages.manage-watermark';

    protected static ?string $navigationLabel = 'Manage Watermark';

    public static function getNavigationGroup(): ?string
    {
        return 'System';
    }

}

