<div class="w-full relative h-4 overflow-hidden rounded-full">
    <div class="absolute top-0 left-0 h-4 bg-white rounded-full animate-loading"></div>
</div>


<style>
.animate-loading {
    animation: Loader 1s infinite;
}

@keyframes Loader {
    0% {
        width: 5%;
        
       
    }
    50% {
        width: 100%;
        transform: translateX(95%);
    }
    100% {
        width: 5%;
    }
}
</style>