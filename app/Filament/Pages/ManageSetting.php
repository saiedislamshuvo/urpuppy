<?php

namespace App\Filament\Pages;

use App\Settings\GeneralSettings;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Group;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Tabs;
use Filament\Forms\Components\Tabs\Tab;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Pages\SettingsPage;

class ManageSetting extends SettingsPage
{
    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';

    protected static ?string $navigationLabel = 'General Settings';

    protected static string $settings = GeneralSettings::class;

    
    public static function getNavigationSort(): ?int
    {
        return 13;
    }

    public static function getNavigationGroup(): ?string
    {
        return 'System'; // This will group the resource under "Content"
    }

    /**
     * Mutate form data before saving - normalize empty strings to null
     */
    protected function mutateFormDataBeforeSave(array $data): array
    {
        // Convert empty strings to null for all string fields
        foreach ($data as $key => $value) {
            if (is_string($value) && trim($value) === '') {
                $data[$key] = null;
            }
            // For arrays, convert empty arrays to null
            if (is_array($value) && empty($value)) {
                $data[$key] = null;
            }
        }

        return $data;
    }

    /**
     * Override save to only update changed (non-null) values
     */
    public function save(): void
    {
        $data = $this->form->getState();
        $data = $this->mutateFormDataBeforeSave($data);
        
        $settings = app(GeneralSettings::class);
        
        // Only update fields that have non-null values (user actually provided a value)
        // If value is null, keep the existing value unchanged
        foreach ($data as $key => $value) {
            // Only update if value is not null (user actually provided a value)
            if ($value !== null) {
                $settings->$key = $value;
            }
            // If value is null, don't update - keep existing value
        }
        
        $settings->save();
        
        // Refresh form data with updated settings
        $this->fillForm();
        
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Tabs::make('Settings')
                    ->tabs([
                        // Homepage Settings Tab
                        Tab::make('Homepage')
                            ->icon('heroicon-o-home')
                            ->schema([
                                Section::make('Site Information')
                                    ->description('Configure basic site information and branding')
                                    ->icon('heroicon-o-globe-alt')
                                    ->schema([
                                        Grid::make(1)
                                            ->schema([
                                                TextInput::make('site_name')
                                                    ->label('Site Name')
                                                    
                                                    ->maxLength(255)
                                                    ->placeholder('e.g., UrPuppy')
                                                    ->helperText('The name of your website')
                                                    ->columnSpan(1),

                                                FileUpload::make('site_logo')
                                                    ->label('Site Logo')
                                                    ->image()
                                                    ->directory('settings/logos')
                                                    ->visibility('public')
                                                    ->maxSize(5120)
                                                    ->imageEditor()
                                                    ->imageEditorAspectRatios([
                                                        null,
                                                        '16:9',
                                                        '4:3',
                                                        '1:1',
                                                    ])
                                                    ->helperText('Upload your site logo. Recommended size: 200x60px. Max 5MB.')
                                                    ->columnSpan(1),
                                            ]),
                                    ])
                                    ->collapsible(),

                                Section::make('Hero Section')
                                    ->description('Configure the main hero section on the homepage')
                                    ->icon('heroicon-o-photo')
                                    ->schema([
                                        Grid::make(1)
                                            ->schema([
                                                TextInput::make('hero_title')
                                                    ->label('Hero Title')
                                                    
                                                    ->maxLength(255)
                                                    ->placeholder('e.g., Puppies for Sale')
                                                    ->helperText('Main heading text for the hero section')
                                                    ->columnSpan(1),

                                                Textarea::make('hero_subtitle')
                                                    ->label('Hero Subtitle')
                                                    
                                                    ->rows(3)
                                                    ->maxLength(500)
                                                    ->placeholder('e.g., Countless Puppies Available For Sale Across the Country!')
                                                    ->helperText('Subtitle or description text below the hero title')
                                                    ->columnSpan(1),
                                            ]),

                                        FileUpload::make('hero_background')
                                            ->label('Hero Background Image')
                                            ->image()
                                            ->directory('settings/hero')
                                            ->visibility('public')
                                            ->maxSize(10240)
                                            ->imageEditor()
                                            ->imageEditorAspectRatios([
                                                '21:9',
                                                '16:9',
                                                null,
                                            ])
                                            ->helperText('Upload a background image for the hero section. Recommended: 1920x800px. Max 10MB.')
                                            ->columnSpanFull(),
                                    ])
                                    ->collapsible(),

                                Section::make('Section Titles & Buttons')
                                    ->description('Configure titles and buttons for various homepage sections')
                                    ->icon('heroicon-o-squares-2x2')
                                    ->schema([
                                        Grid::make(2)
                                            ->schema([
                                                TextInput::make('featured_section_title')
                                                    ->label('Featured Section Title')
                                                    
                                                    ->maxLength(255)
                                                    ->placeholder('e.g., Featured Breeds')
                                                    ->columnSpan(1),

                                                TextInput::make('featured_button_text')
                                                    ->label('Featured Button Text')
                                                    
                                                    ->maxLength(255)
                                                    ->placeholder('e.g., View More Breeds')
                                                    ->columnSpan(1),

                                                TextInput::make('featured_button_link')
                                                    ->label('Featured Button Link')
                                                    
                                                    ->maxLength(255)
                                                    ->placeholder('e.g., /breeds')
                                                    ->helperText('URL path for the featured section button (e.g., /breeds)')
                                                    ->columnSpan(2),
                                            ]),

                                        Grid::make(2)
                                            ->schema([
                                                TextInput::make('spotlight_section_title')
                                                    ->label('Spotlight Section Title')
                                                    
                                                    ->maxLength(255)
                                                    ->placeholder('e.g., Puppy Spotlight')
                                                    ->columnSpan(1),

                                                TextInput::make('spotlight_button_text')
                                                    ->label('Spotlight Button Text')
                                                    
                                                    ->maxLength(255)
                                                    ->placeholder('e.g., View More Breeds')
                                                    ->columnSpan(1),

                                                TextInput::make('spotlight_button_link')
                                                    ->label('Spotlight Button Link')
                                                    
                                                    ->maxLength(255)
                                                    ->placeholder('e.g., /breeds')
                                                    ->helperText('URL path for the spotlight section button (e.g., /breeds)')
                                                    ->columnSpan(2),
                                            ]),

                                        Grid::make(2)
                                            ->schema([
                                                TextInput::make('picks_section_title')
                                                    ->label('Picks Section Title')
                                                    
                                                    ->maxLength(255)
                                                    ->placeholder('e.g., Top Picks For You')
                                                    ->columnSpan(2),
                                            ]),

                                        Grid::make(2)
                                            ->schema([
                                                TextInput::make('trusted_section_title')
                                                    ->label('Trusted Section Title')
                                                    
                                                    ->maxLength(255)
                                                    ->placeholder('e.g., Trusted Breeders')
                                                    ->columnSpan(1),

                                                TextInput::make('trusted_button_text')
                                                    ->label('Trusted Button Text')
                                                    
                                                    ->maxLength(255)
                                                    ->placeholder('e.g., Explore All Breeders')
                                                    ->columnSpan(1),

                                                TextInput::make('trusted_button_link')
                                                    ->label('Trusted Button Link')
                                                    
                                                    ->maxLength(255)
                                                    ->placeholder('e.g., /breeders')
                                                    ->helperText('URL path for the trusted section button (e.g., /breeders)')
                                                    ->columnSpan(2),
                                            ]),

                                        Grid::make(2)
                                            ->schema([
                                                TextInput::make('arrivals_section_title')
                                                    ->label('Arrivals Section Title')
                                                    
                                                    ->maxLength(255)
                                                    ->placeholder('e.g., New Arrivals!')
                                                    ->columnSpan(1),

                                                TextInput::make('arrivals_button_text')
                                                    ->label('Arrivals Button Text')
                                                    
                                                    ->maxLength(255)
                                                    ->placeholder('e.g., Discover new')
                                                    ->columnSpan(1),

                                                TextInput::make('arrivals_button_link')
                                                    ->label('Arrivals Button Link')
                                                    
                                                    ->maxLength(255)
                                                    ->placeholder('e.g., /puppies')
                                                    ->helperText('URL path for the arrivals section button (e.g., /puppies)')
                                                    ->columnSpan(2),
                                            ]),

                                        Grid::make(2)
                                            ->schema([
                                                TextInput::make('blogs_section_title')
                                                    ->label('Blogs Section Title')
                                                    
                                                    ->maxLength(255)
                                                    ->placeholder('e.g., Latest Posts')
                                                    ->columnSpan(1),

                                                TextInput::make('blogs_button_text')
                                                    ->label('Blogs Button Text')
                                                    
                                                    ->maxLength(255)
                                                    ->placeholder('e.g., Discover new posts')
                                                    ->columnSpan(1),

                                                TextInput::make('blogs_button_link')
                                                    ->label('Blogs Button Link')
                                                    
                                                    ->maxLength(255)
                                                    ->placeholder('e.g., /blogs')
                                                    ->helperText('URL path for the blogs section button (e.g., /blogs)')
                                                    ->columnSpan(2),
                                            ]),
                                    ])
                                    ->collapsible(),
                            ]),

                        // Call to Action Tab
                        Tab::make('Call to Action')
                            ->icon('heroicon-o-megaphone')
                            ->schema([
                                Section::make('CTA Section')
                                    ->description('Configure the call-to-action section on the homepage')
                                    ->icon('heroicon-o-arrow-right-circle')
                                    ->schema([
                                        Grid::make(2)
                                            ->schema([
                                                TextInput::make('cta_section_title')
                                                    ->label('CTA Section Title')
                                                    
                                                    ->maxLength(255)
                                                    ->placeholder('e.g., Why Choose UrPuppy.com?')
                                                    ->helperText('Main title for the call-to-action section')
                                                    ->columnSpan(1),

                                                TextInput::make('cta_button_subtitle')
                                                    ->label('CTA Button Subtitle')
                                                    
                                                    ->maxLength(255)
                                                    ->placeholder('e.g., Our advantages')
                                                    ->columnSpan(1),
                                            ]),

                                        TextInput::make('cta_button_link')
                                            ->label('CTA Button Link')
                                            
                                            ->maxLength(255)
                                            ->placeholder('e.g., /why-us')
                                            ->helperText('URL path for the CTA button (e.g., /why-us)')
                                            ->columnSpanFull(),

                                        Repeater::make('cta_features')
                                            ->label('CTA Features')
                                            ->schema([
                                                Grid::make(3)
                                                    ->schema([
                                                        TextInput::make('icon')
                                                            ->label('Icon Class')
                                                            
                                                            ->maxLength(255)
                                                            ->placeholder('e.g., fa-star')
                                                            ->helperText('Font Awesome icon class (e.g., fa-star, fa-heart)')
                                                            ->columnSpan(1),

                                                        TextInput::make('title')
                                                            ->label('Feature Title')
                                                            
                                                            ->maxLength(255)
                                                            ->placeholder('e.g., Verified Breeders')
                                                            ->columnSpan(1),

                                                        Textarea::make('description')
                                                            ->label('Feature Description')
                                                            
                                                            ->rows(2)
                                                            ->maxLength(500)
                                                            ->placeholder('e.g., Find puppies only from trusted breeders.')
                                                            ->columnSpan(1),
                                                    ]),
                                            ])
                                            ->defaultItems(3)
                                            ->minItems(1)
                                            ->maxItems(10)
                                            ->itemLabel(fn (array $state): ?string => $state['title'] ?? null)
                                            ->collapsible()
                                            ->reorderable()
                                            ->addActionLabel('Add Feature')
                                            ->helperText('Add features to display in the CTA section. Each feature should have an icon, title, and description.')
                                            ->columnSpanFull(),
                                    ])
                                    ->collapsible(),
                            ]),

                        // Footer Tab
                        Tab::make('Footer')
                            ->icon('heroicon-o-queue-list')
                            ->schema([
                                Section::make('Footer Configuration')
                                    ->description('Configure footer logo, links, and social media')
                                    ->icon('heroicon-o-arrow-down-tray')
                                    ->schema([
                                        FileUpload::make('footer_logo')
                                            ->label('Footer Logo')
                                            ->image()
                                            ->directory('settings/footer')
                                            ->visibility('public')
                                            ->maxSize(5120)
                                            ->imageEditor()
                                            ->imageEditorAspectRatios([
                                                null,
                                                '16:9',
                                                '4:3',
                                                '1:1',
                                            ])
                                            ->helperText('Upload footer logo. Recommended size: 200x60px. Max 5MB.')
                                            ->columnSpanFull(),

                                        Grid::make(2)
                                            ->schema([
                                                // Column 1
                                                Group::make()
                                                    ->schema([
                                                        TextInput::make('footer_coloum1_title')
                                                            ->label('Column 1 Title')
                                                            
                                                            ->maxLength(255)
                                                            ->placeholder('e.g., Quick Links')
                                                            ->helperText('Header title for footer column 1')
                                                            ->columnSpanFull(),

                                                        Repeater::make('footer_coloum1')
                                                            ->label('Footer Column 1 Links')
                                                            ->schema([
                                                                Grid::make(2)
                                                                    ->schema([
                                                                        TextInput::make('title')
                                                                            ->label('Link Title')
                                                                            
                                                                            ->maxLength(255)
                                                                            ->placeholder('e.g., Find Ur Puppy')
                                                                            ->columnSpan(1),

                                                                        TextInput::make('link')
                                                                            ->label('Link URL')
                                                                            
                                                                            ->maxLength(255)
                                                                            ->placeholder('e.g., /puppies')
                                                                            ->helperText('URL path (e.g., /puppies)')
                                                                            ->columnSpan(1),
                                                                    ]),
                                                            ])
                                                            ->defaultItems(2)
                                                            ->minItems(0)
                                                            ->itemLabel(fn (array $state): ?string => $state['title'] ?? null)
                                                            ->collapsible()
                                                            ->reorderable()
                                                            ->addActionLabel('Add Link')
                                                            ->columnSpanFull(),
                                                    ])
                                                    ->columnSpan(1),

                                                // Column 2
                                                Group::make()
                                                    ->schema([
                                                        TextInput::make('footer_coloum2_title')
                                                            ->label('Column 2 Title')
                                                            
                                                            ->maxLength(255)
                                                            ->placeholder('e.g., Account')
                                                            ->helperText('Header title for footer column 2')
                                                            ->columnSpanFull(),

                                                        Repeater::make('footer_coloum2')
                                                            ->label('Footer Column 2 Links')
                                                            ->schema([
                                                                Grid::make(2)
                                                                    ->schema([
                                                                        TextInput::make('title')
                                                                            ->label('Link Title')
                                                                            
                                                                            ->maxLength(255)
                                                                            ->placeholder('e.g., My Profile')
                                                                            ->columnSpan(1),

                                                                        TextInput::make('link')
                                                                            ->label('Link URL')
                                                                            
                                                                            ->maxLength(255)
                                                                            ->placeholder('e.g., /account')
                                                                            ->helperText('URL path (e.g., /account)')
                                                                            ->columnSpan(1),
                                                                    ]),
                                                            ])
                                                            ->defaultItems(2)
                                                            ->minItems(0)
                                                            ->itemLabel(fn (array $state): ?string => $state['title'] ?? null)
                                                            ->collapsible()
                                                            ->reorderable()
                                                            ->addActionLabel('Add Link')
                                                            ->columnSpanFull(),
                                                    ])
                                                    ->columnSpan(1),

                                                // Column 3
                                                Group::make()
                                                    ->schema([
                                                        TextInput::make('footer_coloum3_title')
                                                            ->label('Column 3 Title')
                                                            
                                                            ->maxLength(255)
                                                            ->placeholder('e.g., Company')
                                                            ->helperText('Header title for footer column 3')
                                                            ->columnSpanFull(),

                                                        Repeater::make('footer_coloum3')
                                                            ->label('Footer Column 3 Links')
                                                            ->schema([
                                                                Grid::make(2)
                                                                    ->schema([
                                                                        TextInput::make('title')
                                                                            ->label('Link Title')
                                                                            
                                                                            ->maxLength(255)
                                                                            ->placeholder('e.g., About Us')
                                                                            ->columnSpan(1),

                                                                        TextInput::make('link')
                                                                            ->label('Link URL')
                                                                            
                                                                            ->maxLength(255)
                                                                            ->placeholder('e.g., /about')
                                                                            ->helperText('URL path (e.g., /about)')
                                                                            ->columnSpan(1),
                                                                    ]),
                                                            ])
                                                            ->defaultItems(2)
                                                            ->minItems(0)
                                                            ->itemLabel(fn (array $state): ?string => $state['title'] ?? null)
                                                            ->collapsible()
                                                            ->reorderable()
                                                            ->addActionLabel('Add Link')
                                                            ->columnSpanFull(),
                                                    ])
                                                    ->columnSpan(1),

                                                // Column 4
                                                Group::make()
                                                    ->schema([
                                                        TextInput::make('footer_coloum4_title')
                                                            ->label('Column 4 Title')
                                                            
                                                            ->maxLength(255)
                                                            ->placeholder('e.g., Support')
                                                            ->helperText('Header title for footer column 4')
                                                            ->columnSpanFull(),

                                                        Repeater::make('footer_coloum4')
                                                            ->label('Footer Column 4 Links')
                                                            ->schema([
                                                                Grid::make(2)
                                                                    ->schema([
                                                                        TextInput::make('title')
                                                                            ->label('Link Title')
                                                                            
                                                                            ->maxLength(255)
                                                                            ->placeholder('e.g., FAQ')
                                                                            ->columnSpan(1),

                                                                        TextInput::make('link')
                                                                            ->label('Link URL')
                                                                            
                                                                            ->maxLength(255)
                                                                            ->placeholder('e.g., /faq')
                                                                            ->helperText('URL path (e.g., /faq)')
                                                                            ->columnSpan(1),
                                                                    ]),
                                                            ])
                                                            ->defaultItems(2)
                                                            ->minItems(0)
                                                            ->itemLabel(fn (array $state): ?string => $state['title'] ?? null)
                                                            ->collapsible()
                                                            ->reorderable()
                                                            ->addActionLabel('Add Link')
                                                            ->columnSpanFull(),
                                                    ])
                                                    ->columnSpan(1),
                                            ]),

                                        Repeater::make('footer_social_media')
                                            ->label('Social Media Links')
                                            ->schema([
                                                Grid::make(2)
                                                    ->schema([
                                                        TextInput::make('icon')
                                                            ->label('Icon Class')
                                                            
                                                            ->maxLength(255)
                                                            ->placeholder('e.g., fa-facebook')
                                                            ->helperText('Font Awesome icon class (e.g., fa-facebook, fa-instagram)')
                                                            ->columnSpan(1),

                                                        TextInput::make('link')
                                                            ->label('Social Media URL')
                                                            
                                                            ->url()
                                                            ->maxLength(255)
                                                            ->placeholder('e.g., https://facebook.com/urpuppy')
                                                            ->helperText('Full URL for the social media profile')
                                                            ->columnSpan(1),
                                                    ]),
                                            ])
                                            ->defaultItems(2)
                                            ->minItems(0)
                                            ->itemLabel(fn (array $state): ?string => $state['icon'] ?? null)
                                            ->collapsible()
                                            ->reorderable()
                                            ->addActionLabel('Add Social Media')
                                            ->helperText('Add social media links to display in the footer')
                                            ->columnSpanFull(),

                                        TextInput::make('footer_copyright_text')
                                            ->label('Copyright Text')
                                            
                                            ->maxLength(255)
                                            ->placeholder('e.g., ©2025 Urpuppy.com, LLC. All Rights Reserved')
                                            ->helperText('Copyright text displayed at the bottom of the footer')
                                            ->columnSpanFull(),
                                    ])
                                    ->collapsible(),
                            ]),

                        // Puppies for Sale Page Tab
                        Tab::make('Puppies Page')
                            ->icon('heroicon-o-photo')
                            ->schema([
                                Section::make('Puppies for Sale Page Settings')
                                    ->description('Configure the hero section for the Puppies for Sale page')
                                    ->icon('heroicon-o-shopping-bag')
                                    ->schema([
                                        Grid::make(1)
                                            ->schema([
                                                TextInput::make('puppies_hero_title')
                                                    ->label('Hero Title')
                                                    
                                                    ->maxLength(255)
                                                    ->placeholder('e.g., Puppies for Sale')
                                                    ->helperText('Main heading for the Puppies for Sale page')
                                                    ->columnSpan(1),

                                                Textarea::make('puppies_hero_subtitle')
                                                    ->label('Hero Subtitle')
                                                    
                                                    ->rows(3)
                                                    ->maxLength(500)
                                                    ->placeholder('e.g., Countless Puppies Available For Sale Across the Country!')
                                                    ->helperText('Subtitle text for the hero section')
                                                    ->columnSpan(1),
                                            ]),

                                        FileUpload::make('puppies_hero_background')
                                            ->label('Hero Background Image')
                                            ->image()
                                            ->directory('settings/puppies-hero')
                                            ->visibility('public')
                                            ->maxSize(10240)
                                            ->imageEditor()
                                            ->imageEditorAspectRatios([
                                                '21:9',
                                                '16:9',
                                                null,
                                            ])
                                            ->helperText('Upload a background image for the hero section. Recommended: 1920x800px. Max 10MB.')
                                            ->columnSpanFull(),
                                    ])
                                    ->collapsible(),
                            ]),

                        // Breeds Page Tab
                        Tab::make('Breeds Page')
                            ->icon('heroicon-o-squares-plus')
                            ->schema([
                                Section::make('Breeds Page Settings')
                                    ->description('Configure the hero section and content for the Breeds page')
                                    ->icon('heroicon-o-sparkles')
                                    ->schema([
                                        Grid::make(1)
                                            ->schema([
                                                TextInput::make('breeds_hero_title')
                                                    ->label('Hero Title')
                                                    
                                                    ->maxLength(255)
                                                    ->placeholder('e.g., Siberian Husky: Your Winter Companion')
                                                    ->helperText('Main heading for the Breeds page')
                                                    ->columnSpan(1),

                                                Textarea::make('breeds_hero_subtitle')
                                                    ->label('Hero Subtitle')
                                                    
                                                    ->rows(3)
                                                    ->maxLength(500)
                                                    ->placeholder('e.g., Find Breeds')
                                                    ->helperText('Subtitle text for the hero section')
                                                    ->columnSpan(1),
                                            ]),

                                        FileUpload::make('breeds_hero_background')
                                            ->label('Hero Background Image')
                                            ->image()
                                            ->directory('settings/breeds-hero')
                                            ->visibility('public')
                                            ->maxSize(10240)
                                            ->imageEditor()
                                            ->imageEditorAspectRatios([
                                                '21:9',
                                                '16:9',
                                                null,
                                            ])
                                            ->helperText('Upload a background image for the hero section. Recommended: 1920x800px. Max 10MB.')
                                            ->columnSpanFull(),

                                        TextInput::make('breeds_section_title')
                                            ->label('Section Title')
                                            
                                            ->maxLength(255)
                                            ->placeholder('e.g., Choose your breeds')
                                            ->helperText('Title for the breeds listing section')
                                            ->columnSpanFull(),
                                    ])
                                    ->collapsible(),
                            ]),

                        // Breeders Page Tab
                        Tab::make('Breeders Page')
                            ->icon('heroicon-o-users')
                            ->schema([
                                Section::make('Breeders Page Settings')
                                    ->description('Configure the hero section and content for the Breeders page')
                                    ->icon('heroicon-o-user-group')
                                    ->schema([
                                        Grid::make(1)
                                            ->schema([
                                                TextInput::make('breeders_hero_title')
                                                    ->label('Hero Title')
                                                    
                                                    ->maxLength(255)
                                                    ->placeholder('e.g., Register as a breeder')
                                                    ->helperText('Main heading for the Breeders page')
                                                    ->columnSpan(1),

                                                Textarea::make('breeders_hero_subtitle')
                                                    ->label('Hero Subtitle')
                                                    
                                                    ->rows(3)
                                                    ->maxLength(500)
                                                    ->placeholder('e.g., Find breeders')
                                                    ->helperText('Subtitle text for the hero section')
                                                    ->columnSpan(1),
                                            ]),

                                        FileUpload::make('breeders_hero_background')
                                            ->label('Hero Background Image')
                                            ->image()
                                            ->directory('settings/breeders-hero')
                                            ->visibility('public')
                                            ->maxSize(10240)
                                            ->imageEditor()
                                            ->imageEditorAspectRatios([
                                                '21:9',
                                                '16:9',
                                                null,
                                            ])
                                            ->helperText('Upload a background image for the hero section. Recommended: 1920x800px. Max 10MB.')
                                            ->columnSpanFull(),

                                        TextInput::make('breeders_section_title')
                                            ->label('Section Title')
                                            
                                            ->maxLength(255)
                                            ->placeholder('e.g., Choose your Breeder')
                                            ->helperText('Title for the breeders listing section')
                                            ->columnSpanFull(),
                                    ])
                                    ->collapsible(),
                            ]),
                    ])
                    ->columnSpanFull(),
            ]);
    }
}
