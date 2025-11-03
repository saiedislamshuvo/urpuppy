@props(['name', 'props' => []])

<div 
    id="react-{{ Str::random(8) }}" 
    data-component="{{ $name }}"
    data-props="{{ json_encode($props) }}"
    class="react-container"
></div>

@once
    @push('scripts')
        @viteReactRefresh
        @vite(['resources/js/panels/index.tsx'])
    @endpush
@endonce

