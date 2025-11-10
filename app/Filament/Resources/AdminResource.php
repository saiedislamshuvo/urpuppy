<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AdminResource\Pages;
use App\Filament\Resources\AdminResource\RelationManagers;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Get;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Columns\ImageColumn;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Facades\Hash;
use Filament\Tables\Actions\Action;

class AdminResource extends Resource
{
    protected static ?string $model = User::class;
    protected static ?string $modelLabel = 'Admin';
    protected static ?string $pluralModelLabel = 'Admins';
    protected static ?string $navigationLabel = 'Admins';
    protected static ?string $navigationGroup = 'Authentication';
    protected static ?string $navigationIcon = 'phosphor-users-three';


     public static function getNavigationBadge(): ?string
    {
        return static::getModel()::count();
    }

    public static function getNavigationBadgeColor(): ?string
    {
        return static::getModel()::count() > 50 ? 'success' : 'primary';
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()->where('is_admin', true)->orWhere('is_superadmin', true);
    }
    public static function getNavigationSort(): ?int
    {
        return 14;
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Personal Information')
                    ->description('Basic information about the admin user')
                    ->icon('heroicon-o-user-circle')
                    ->schema([
                        Forms\Components\Grid::make(2)
                            ->schema([
                                Forms\Components\TextInput::make('first_name')
                                    ->required()
                                    ->maxLength(255)
                                    ->placeholder('Enter first name')
                                    ->columnSpan(1),
                                Forms\Components\TextInput::make('last_name')
                                    ->required()
                                    ->maxLength(255)
                                    ->placeholder('Enter last name')
                                    ->columnSpan(1),
                                Forms\Components\TextInput::make('email')
                                    ->email()
                                    ->required()
                                    ->unique(table: User::class, ignorable: fn ($record) => $record)
                                    ->maxLength(255)
                                    ->placeholder('admin@example.com')
                                    ->columnSpan(1),
                                Forms\Components\TextInput::make('phone')
                                    ->tel()
                                    ->maxLength(20)
                                    ->placeholder('+1 (555) 000-0000')
                                    ->columnSpan(1),
                            ]),
                    ])
                    ->columns(2)
                    ->collapsible(),

                Forms\Components\Section::make('Authentication')
                    ->description('Set up login credentials for the admin')
                    ->icon('heroicon-o-lock-closed')
                    ->schema([
                        Forms\Components\Grid::make(2)
                            ->schema([
                                Forms\Components\TextInput::make('password')
                                    ->password()
                                    ->required(fn ($record) => $record === null)
                                    ->minLength(8)
                                    ->hiddenOn('edit')
                                    ->dehydrated(fn ($state) => filled($state))
                                    ->dehydrateStateUsing(fn ($state) => filled($state) ? Hash::make($state) : null)
                                    ->confirmed()
                                    ->maxLength(255)
                                    ->placeholder('Enter secure password')
                                    ->helperText('Minimum 8 characters required')
                                    ->columnSpan(1),
                                Forms\Components\TextInput::make('password_confirmation')
                                    ->password()
                                    ->required(fn ($record, Get $get) => filled($get('password')))
                                    ->hiddenOn('edit')
                                    ->dehydrated(false)
                                    ->maxLength(255)
                                    ->placeholder('Confirm password')
                                    ->columnSpan(1),
                            ]),
                    ])
                    ->columns(2)
                    ->collapsible()
                    ->hiddenOn('edit'),

                Forms\Components\Section::make('Permissions & Access')
                    ->description('Configure admin roles and access levels')
                    ->icon('heroicon-o-shield-check')
                    ->schema([
                        Forms\Components\Select::make('roles')
                            ->label('Roles')
                            ->multiple()
                            ->relationship('roles', 'name')
                            ->preload()
                            ->searchable()
                            ->placeholder('Select roles')
                            ->helperText('Assign roles to grant specific permissions')
                            ->columnSpanFull()
                            ->hidden(fn (Get $get) => $get('is_superadmin') === true),
                        Forms\Components\Grid::make(2)
                            ->schema([
                                Forms\Components\Toggle::make('is_admin')
                                    ->label('Admin Access')
                                    ->helperText('Grant admin privileges to this user')
                                    ->default(true)
                                    ->hiddenOn('create')
                                    ->reactive()
                                    ->hidden(fn (Get $get) => $get('is_superadmin') === true)
                                    ->afterStateUpdated(function (Set $set, $state, Get $get) {
                                        // If is_superadmin is true, ensure is_admin is also true
                                        if ($get('is_superadmin')) {
                                            $set('is_admin', true);
                                        }
                                    })
                                    ->columnSpan(1),
                                Forms\Components\Toggle::make('is_superadmin')
                                    ->label('Super Admin Access')
                                    ->helperText('Grant full system access (highest privilege level)')
                                    ->default(false)
                                    ->reactive()
                                    ->afterStateUpdated(function (Set $set, $state) {
                                        // If is_superadmin is true, automatically set is_admin to true
                                        if ($state) {
                                            $set('is_admin', true);
                                        }
                                    })
                                    ->columnSpan(1),
                            ]),
                    ])
                    ->columns(2)
                    ->collapsible(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('avatar')
                    ->circular()
                    ->label('Avatar')
                    ->defaultImageUrl(fn (User $record) => $record->getFilamentAvatarUrl())
                    ->width(50)
                    ->height(50),
                Tables\Columns\TextColumn::make('full_name')
                    ->label('Full Name')
                    ->searchable(['first_name', 'last_name'])
                    ->sortable(),
                Tables\Columns\TextColumn::make('email')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('phone')
                    ->label('Phone Number')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('admin_status')
                    ->label('Admin Status')
                    ->badge()
                    ->state(fn (User $record): string => $record->is_superadmin ? 'Super Admin' : 'Admin')
                    ->color(fn (User $record): string => $record->is_superadmin ? 'danger' : 'success'),
                Tables\Columns\TextColumn::make('roles.name')
                    ->label('Roles')
                    ->badge()
                    ->separator(','),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\ActionGroup::make([
                    Tables\Actions\EditAction::make(),
                    Action::make('change_password')
                        ->label('Change Password')
                        ->icon('heroicon-o-key')
                        ->form([
                            Forms\Components\TextInput::make('password')
                                ->label('New Password')
                                ->password()
                                ->required()
                                ->minLength(8)
                                ->dehydrateStateUsing(fn ($state) => Hash::make($state))
                                ->confirmed(),
                            Forms\Components\TextInput::make('password_confirmation')
                                ->label('Confirm Password')
                                ->password()
                                ->required()
                                ->dehydrated(false),
                        ])
                        ->action(function (User $record, array $data): void {
                            $record->update([
                                'password' => $data['password'],
                            ]);
                        })
                        ->successNotificationTitle('Password changed successfully'),
                    Tables\Actions\DeleteAction::make(),
                ])->iconButton(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ManageAdmins::route('/'),
        ];
    }
}
