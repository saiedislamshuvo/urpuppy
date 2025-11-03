<?php

namespace App\Filament\Breeder\Pages;

use App\Filament\Clusters\DashboardCluster;
use Filament\Actions\Action;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Forms\Components\Textarea;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class Account extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-user-circle';
    protected static ?string $navigationLabel = 'Account';
    protected static ?int $navigationSort = 6;
    protected static string $view = 'filament.breeder.pages.account';
    protected static ?string $cluster = DashboardCluster::class;
    protected static ?string $title = 'My Account';

    public ?array $data = [];

    public function mount(): void
    {
        $user = Auth::user();
        
        $this->form->fill([
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'email' => $user->email,
            'phone' => $user->phone,
            'kennel_name' => $user->kennel_name,
            'company_email_address' => $user->company_email_address,
            'company_phone' => $user->company_phone,
            'company_established_on' => $user->company_established_on,
            'has_usda_registration' => $user->has_usda_registration ?? false,
            'company_about' => $user->company_about,
            'social_fb' => $user->social_fb,
            'social_ig' => $user->social_ig,
            'social_tiktok' => $user->social_tiktok,
            'social_x' => $user->social_x,
            'enable_notification' => $user->enable_notification ?? true,
        ]);
    }

    public function form(Form $form): Form
    {
        return $form
            ->model(Auth::user())
            ->schema([
                // Breeder Form Information Section
                Section::make('Breeder Form Information')
                    ->description('Update your personal information')
                    ->icon('heroicon-o-user')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                SpatieMediaLibraryFileUpload::make('avatar')
                                    ->label('Profile Image')
                                    ->collection('avatars')
                                    ->disk(config('media-library.disk_name'))
                                    ->image()
                                    ->imageEditor()
                                    ->circleCropper()
                                    ->maxSize(5120)
                                    ->columnSpanFull()
                                    ->helperText('Upload a profile photo (max 5MB)'),
                                
                                TextInput::make('first_name')
                                    ->label('First Name')
                                    ->required()
                                    ->maxLength(255)
                                    ->placeholder('Enter your first name'),
                                
                                TextInput::make('last_name')
                                    ->label('Last Name')
                                    ->required()
                                    ->maxLength(255)
                                    ->placeholder('Enter your last name'),
                                
                                TextInput::make('email')
                                    ->label('Email Address')
                                    ->email()
                                    ->required()
                                    ->maxLength(255)
                                    ->placeholder('your.email@example.com'),
                                
                                TextInput::make('phone')
                                    ->label('Phone Number')
                                    ->tel()
                                    ->maxLength(20)
                                    ->placeholder('(555) 123-4567')
                                    ->helperText('Your personal phone number'),
                            ]),
                    ]),

                // Company/Kennel Information Section
                Section::make('Company/Kennel Information')
                    ->description('Manage your kennel and business details')
                    ->icon('heroicon-o-building-office-2')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextInput::make('kennel_name')
                                    ->label('Kennel Name')
                                    ->required()
                                    ->maxLength(255)
                                    ->placeholder('Your Kennel Name')
                                    ->helperText('The official name of your kennel'),
                                
                                TextInput::make('company_email_address')
                                    ->label('Kennel Email')
                                    ->email()
                                    ->maxLength(255)
                                    ->placeholder('kennel@example.com')
                                    ->helperText('Business email for your kennel'),
                                
                                TextInput::make('company_phone')
                                    ->label('Kennel Phone Number')
                                    ->tel()
                                    ->maxLength(20)
                                    ->placeholder('(555) 987-6543')
                                    ->helperText('Business phone number'),
                                
                                DatePicker::make('company_established_on')
                                    ->label('Kennel Established On')
                                    ->native(false)
                                    ->displayFormat('M d, Y')
                                    ->maxDate(now())
                                    ->helperText('When was your kennel established?'),
                                
                                Toggle::make('has_usda_registration')
                                    ->label('Has USDA Registration')
                                    ->helperText('Do you have USDA registration?')
                                    ->inline(false)
                                    ->columnSpanFull(),
                                
                                Textarea::make('company_about')
                                    ->label('Kennel Description')
                                    ->rows(4)
                                    ->maxLength(5000)
                                    ->placeholder('Tell us about your kennel, breeding practices, and what makes you unique...')
                                    ->helperText('Describe your kennel and breeding program')
                                    ->columnSpanFull(),
                            ]),
                    ]),

                // Social Profiles Section
                Section::make('Social Profiles')
                    ->description('Connect your social media accounts')
                    ->icon('heroicon-o-share')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextInput::make('social_fb')
                                    ->label('Facebook')
                                    ->url()
                                    ->prefix('https://')
                                    ->placeholder('facebook.com/yourpage')
                                    ->maxLength(255),
                                
                                TextInput::make('social_ig')
                                    ->label('Instagram')
                                    ->url()
                                    ->prefix('https://')
                                    ->placeholder('instagram.com/yourpage')
                                    ->maxLength(255),
                                
                                TextInput::make('social_tiktok')
                                    ->label('TikTok')
                                    ->url()
                                    ->prefix('https://')
                                    ->placeholder('tiktok.com/@yourpage')
                                    ->maxLength(255),
                                
                                TextInput::make('social_x')
                                    ->label('X (Twitter)')
                                    ->url()
                                    ->prefix('https://')
                                    ->placeholder('x.com/yourpage')
                                    ->maxLength(255),
                            ]),
                    ]),

                // Notifications Section
                Section::make('Notifications')
                    ->description('Manage your notification preferences')
                    ->icon('heroicon-o-bell')
                    ->schema([
                        Toggle::make('enable_notification')
                            ->label('Account Notifications')
                            ->helperText('We will send you notifications to inform you of any updates and/or changes as events occur for you')
                            ->inline(false)
                            ->default(true),
                    ]),

                // Manage Account Section
                Section::make('Manage Account')
                    ->description('Account management and security options')
                    ->icon('heroicon-o-shield-check')
                    ->schema([
                        Grid::make(1)
                            ->schema([
                                \Filament\Forms\Components\Placeholder::make('delete_account_info')
                                    ->label('Delete Account')
                                    ->content('Permanently delete your urpuppy.com account. This action cannot be undone. Use the "Delete Account" button in the page header to proceed.')
                                    ->extraAttributes([
                                        'class' => 'text-sm text-gray-600 dark:text-gray-400'
                                    ]),
                            ]),
                    ]),
            ])
            ->statePath('data');
    }

    protected function getFormActions(): array
    {
        return [
            Action::make('save')
                ->label('Save Changes')
                ->submit('save')
                ->color('primary')
                ->icon('heroicon-o-check-circle'),
        ];
    }

    public function save(): void
    {
        $data = $this->form->getState();
        $user = Auth::user();

        // Update user data (SpatieMediaLibraryFileUpload handles media automatically)
        $user->update($data);

        Notification::make()
            ->success()
            ->title('Account Updated')
            ->body('Your account information has been successfully updated.')
            ->send();
    }

    protected function getHeaderActions(): array
    {
        return [
            Action::make('delete_account')
                ->label('Delete Account')
                ->icon('heroicon-o-trash')
                ->color('danger')
                ->requiresConfirmation()
                ->modalHeading('Delete Account')
                ->modalDescription('Are you sure you want to permanently delete your urpuppy.com account? This action cannot be undone.')
                ->modalSubmitActionLabel('Yes, Delete My Account')
                ->action(function () {
                    $user = Auth::user();
                    
                    // Log out the user
                    Auth::logout();
                    
                    // Soft delete the account
                    $user->delete();
                    
                    // Redirect to home page
                    return redirect('/');
                }),
        ];
    }
}
