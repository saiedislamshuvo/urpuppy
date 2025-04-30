<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserResource\Pages\ViewUser;
use Filament\Forms\Components\Section as Card;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Forms\Get;
use Filament\Resources\Resource;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\ForceDeleteAction;
use Filament\Tables\Actions\ForceDeleteBulkAction;
use Filament\Tables\Actions\RestoreAction;
use Filament\Tables\Actions\RestoreBulkAction;
use Filament\Tables\Actions\ViewAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Phpsa\FilamentAuthentication\Actions\ImpersonateLink;
use Phpsa\FilamentAuthentication\FilamentAuthentication;
use Phpsa\FilamentAuthentication\Resources\UserResource\Pages\CreateUser;
use Phpsa\FilamentAuthentication\Resources\UserResource\Pages\EditUser;
use Phpsa\FilamentAuthentication\Resources\UserResource\Pages\ListUsers;
use Phpsa\FilamentAuthentication\Resources\UserResource\RelationManager\AuthenticationLogsRelationManager;
use Phpsa\FilamentAuthentication\Traits\CanRenewPassword;
use Phpsa\FilamentAuthentication\Traits\LogsAuthentication;

class UserResource extends Resource
{
    protected static ?string $navigationIcon = 'heroicon-o-user';

    protected static ?string $recordTitleAttribute = 'first_name';

    public static function getGloballySearchableAttributes(): array
    {
        return ['first_name', 'last_name', 'email'];
    }

    public static function getModel(): string
    {
        return FilamentAuthentication::getPlugin()->getModel('User');
    }

    public static function canCreate(): bool
    {
        return false;
    }

    public static function getNavigationGroup(): ?string
    {
        return strval(__(config('filament-authentication.section.group') ?? 'filament-authentication::filament-authentication.section.group'));
    }

    public static function getLabel(): string
    {
        return strval(__('filament-authentication::filament-authentication.section.user'));
    }

    public static function getPluralLabel(): string
    {
        return strval(__('filament-authentication::filament-authentication.section.users'));
    }

    public static function shouldRegisterNavigation(): bool
    {
        return config('filament-authentication.navigation.user.register', true);
    }

    public static function getNavigationIcon(): string
    {
        return config('filament-authentication.navigation.user.icon');
    }

    public static function getNavigationSort(): ?int
    {
        return config('filament-authentication.navigation.user.sort');
    }

    public static function form(Form $form): Form
    {

        return $form
            ->schema([
                Card::make()
                    ->schema([
                        SpatieMediaLibraryFileUpload::make('avatar')
                            ->validationMessages([
                                'max' => 'Image size should be less than 10MB',
                            ])
                            ->disk(config('media-library.disk_name'))->collection('avatars')->rules([
                            'max:10040',
                        ])->circleCropper(),
                        TextInput::make('first_name'),
                        TextInput::make('last_name'),

                        TextInput::make('email')
                            ->required()
                            ->email()
                            ->unique(table: static::$model, ignorable: fn ($record) => $record)
                            ->label(strval(__('filament-authentication::filament-authentication.field.user.email'))),

                        TextInput::make('password')
                            ->same('passwordConfirmation')
                            ->hiddenOn('view')
                            ->live(debounce: 250)
                            ->password()
                            ->maxLength(255)
                            ->required(fn ($record) => $record === null) // Ensure password is required only on create
                            ->dehydrateStateUsing(fn ($state) => ! empty($state) ? Hash::make($state) : '')
                            ->label(strval(__('filament-authentication::filament-authentication.field.user.password'))),

                        TextInput::make('passwordConfirmation')
                            ->password()
                            ->dehydrated(false)
                            ->visible(fn (Get $get) => filled($get('password')))
                            ->maxLength(255)
                            ->label(strval(__('filament-authentication::filament-authentication.field.user.confirm_password'))),

                        Select::make('roles')
                            ->multiple()
                            ->relationship('roles', 'name')
                            ->preload(FilamentAuthentication::getPlugin()->getPreloadRoles())
                            ->label(strval(__('filament-authentication::filament-authentication.field.user.roles'))),
                    ])
                    ->columns(2), // Ensure all fields inside this Card share 2 columns

                Card::make()
                    ->schema([
                        TextInput::make('kennel_name'),
                        TextInput::make('company_name'),

                        TextInput::make('company_about'),
                        TextInput::make('has_usda_registration'),
                        TextInput::make('company_address'),
                        TextInput::make('company_established_on'),

                        SpatieMediaLibraryFileUpload::make('company_logo')->rules(['max:10040'])->disk(config('media-library.disk_name'))->collection('company_logo'),

                        SpatieMediaLibraryFileUpload::make('video')->disk(config('media-library.disk_name'))->collection('videos')->multiple(),
                        SpatieMediaLibraryFileUpload::make('gallery')->collection('gallery')->multiple()->disk(config('media-library.disk_name'))->columns(2),

                    ])
                    ->columns(2),

            ]);

    }

    protected static function getTableColumns(): array
    {
        /* dd('adi'); */
        $columns = [
            'avatar' => ImageColumn::make('avatar')->circular()->label('Avatar')->toggleable()->width(50)->height(50),
            'full_name' => TextColumn::make('full_name')
                ->sortable()

                ->toggleable()
                ->label('Full Name'),
            'email' => TextColumn::make('email')
                ->searchable()

                ->toggleable()
                ->sortable()
                ->label(strval(__('filament-authentication::filament-authentication.field.user.email'))),

            'email_verified_at' => IconColumn::make('email_verified_at')
                ->default(false)
                ->boolean()
                ->toggleable()
                ->toggledHiddenByDefault()
                ->label(strval(__('filament-authentication::filament-authentication.field.user.verified_at'))),
            'roles.name' => TextColumn::make('roles.name')->badge()
                ->label(strval(__('filament-authentication::filament-authentication.field.user.roles'))),
            'created_at' => TextColumn::make('created_at')
                ->dateTime('Y-m-d H:i:s')
                ->toggleable()
                ->toggledHiddenByDefault()
                ->label(strval(__('filament-authentication::filament-authentication.field.user.created_at'))),
        ];

        if (in_array(LogsAuthentication::class, class_uses_recursive(FilamentAuthentication::getPlugin()->getModel('User')))) {
            $columns['last_login'] = TextColumn::make('latestSuccessfullAuthentication.login_at')
                ->dateTime('Y-m-d H:i:s')
                ->description(fn (Model $record) => $record->latestSuccessfullAuthentication?->ip_address ?? '-')
                ->label(strval(__('filament-authentication::filament-authentication.field.user.last_login_at')));
        }

        if (in_array(CanRenewPassword::class, class_uses_recursive(FilamentAuthentication::getPlugin()->getModel('User')))) {
            $columns['last_password_changed'] = TextColumn::make('latestRenewable.created_at')
                ->dateTime('Y-m-d H:i:s')
                ->label(strval(__('filament-authentication::filament-authentication.field.user.last_password_updated')));
        }

        return $columns;
    }

    protected static function getTableFilters(): array
    {
        $filters = [
            'email_verified_at' => TernaryFilter::make('email_verified_at')
                ->label(strval(__('filament-authentication::filament-authentication.filter.verified')))
                ->nullable(),

            'roles' => SelectFilter::make('roles')
                ->relationship('roles', 'name') // Use the Spatie relationship
        /* ->multiple() // Allows selecting multiple roles */
                ->label('Role')
                ->options([
                    'buyer' => 'Buyer',
                    'seller' => 'Seller',
                    'breeder' => 'Breeder',
                ]),

            /* ->attribute('role_id'), */
        ];

        if (FilamentAuthentication::getPlugin()->usesSoftDeletes()) {
            $filters['trashed'] = \Filament\Tables\Filters\TrashedFilter::make();
        }

        return $filters;
    }

    protected static function getTableActions(): array
    {
        $actions = [
            'view' => ViewAction::make(),
            'edit' => EditAction::make(),
            'impersonate' => FilamentAuthentication::getPlugin()->impersonateEnabled() ? ImpersonateLink::make() : null,
            'delete' => DeleteAction::make(),
            'force_delete' => FilamentAuthentication::getPlugin()->usesSoftDeletes() ? ForceDeleteAction::make() : null,
            'restore' => FilamentAuthentication::getPlugin()->usesSoftDeletes() ? RestoreAction::make() : null,
        ];

        return array_filter($actions);
    }

    protected static function getTableBulkActions(): array
    {
        $actions = [
            DeleteBulkAction::make(),
            FilamentAuthentication::getPlugin()->usesSoftDeletes() ? RestoreBulkAction::make() : null,
            FilamentAuthentication::getPlugin()->usesSoftDeletes() ? ForceDeleteBulkAction::make() : null,
        ];

        return array_filter($actions);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns(static::getTableColumns())
            ->filters(static::getTableFilters())
            ->actions(static::getTableActions())
            ->bulkActions(static::getTableBulkActions());
    }

    public static function getRelations(): array
    {
        return [
            AuthenticationLogsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListUsers::route('/'),
            'create' => CreateUser::route('/create'),
            'edit' => EditUser::route('/{record}/edit'),
            'view' => ViewUser::route('/{record}'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->when(
                FilamentAuthentication::getPlugin()->usesSoftDeletes(),
                fn (Builder $builder) => $builder->withTrashed()
            );
    }
}
