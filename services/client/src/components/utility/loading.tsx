/**
 * Loading animation component.
 */

export function Loading() {
  return (
    <div className="min-w-full min-h-full flex flex-col justify-center items-center">
      <img
        className="w-16 h-16 rounded-3xl border border-black border-opacity-5 shadow motion-safe:animate-bounce"
        src="https://cdn.discordapp.com/icons/907723403639808030/a_70e2d397398980b971686a8da6b94487.png"
        alt="Image to indicate a loading state."
      />
      <span className="mt-5 font-bold text-flightgray">Loading...</span>
    </div>
  )
}
