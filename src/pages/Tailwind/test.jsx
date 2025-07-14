
export default function TestPage() {
    return (
        <main className="container mx-auto mt-[70px] layout-test">
            <div class="flex items-stretch ...">
                <div>01</div>
                <div class="self-center ...">02</div>
                <div>03</div>
            </div>

            <div class="grid grid-cols-1">
                <div class="col-start-1 row-start-1 rounded-lg border text-black/10 dark:text-white/12.5 bg-[size:8px_8px] bg-top-left bg-[image:repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,transparent_0,transparent_50%)]" />
                <div class="col-start-1 row-start-1 flex h-24 w-full items-stretch gap-4 rounded-lg font-mono text-sm leading-6 font-bold text-white">
                    <div class="flex flex-1 items-center justify-center rounded-lg bg-purple-300 p-4 dark:bg-purple-800 dark:text-purple-400">01</div>
                    <div class="flex flex-1 items-center justify-center self-center rounded-lg bg-purple-500 p-4">02</div>
                    <div class="flex flex-1 items-center justify-center rounded-lg bg-purple-300 p-4 dark:bg-purple-800 dark:text-purple-400">03</div>
                </div>
            </div>
        </main>
    )
}