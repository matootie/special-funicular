/**
 * Component to customize role details.
 */

// External imports.
import { useState, ChangeEvent, Fragment } from "react"
import { HexColorPicker } from "react-colorful"
import toast from "react-hot-toast"

// Component imports.
import { Toast } from "#components/utility"

// Utility imports.
import { useUser } from "#utils/auth"
import { useModifyRolePreferences } from "#utils/api"

export function CustomRole() {
  const user = useUser()
  const [color, setColor] = useState("#5865F2")
  const [roleName, setRoleName] = useState<string>("booga")
  const [file, setFile] = useState<File>()
  const [image, setImage] = useState<string>()
  const { mutate, isLoading } = useModifyRolePreferences()

  function onChangeFile(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files?.[0]) {
      setFile(event.target.files[0])
      const reader = new FileReader()
      reader.addEventListener("load", () => {
        setImage(reader.result as string)
      })
      reader.readAsDataURL(event.target.files[0])
    }
  }

  function submit() {
    mutate(
      { color },
      {
        onSuccess: () => {
          toast.custom((t) => (
            <Toast
              toast={t}
              variant="success"
              title="Saved changes!"
              body="Successfully saved role preferences."
            />
          ))
        },
        onError: (error) => {
          console.error(error.response.data)
          toast.custom((t) => (
            <Toast
              toast={t}
              variant="error"
              title={error.response.data.error}
              body={error.response.data.message}
            />
          ))
        },
      }
    )
  }

  return (
    <div className="px-4 md:px-8 py-5 md:py-9">
      <h1 className="text-fwhite font-semibold text-base leading-7">
        Role customizations
      </h1>
      <p className="mt-1 text-sm leading-6 text-flightgray">
        Choose a color, name and icon for your vanity role.
      </p>
      <div className="flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-6 py-6">
        <div className="flex flex-col">
          <span className="block text-sm font-semibold text-flightgray mb-4">
            Options
          </span>
          <label className="block mb-1 text-flightgray text-sm">
            Role color
          </label>
          <div className="h-56">
            <HexColorPicker
              color={color}
              onChange={setColor}
            />
          </div>
          <label
            htmlFor="roleName"
            className="block mt-4 text-flightgray text-sm"
          >
            Role name
          </label>
          <input
            type="text"
            id="roleName"
            value={roleName}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            onChange={(e) => setRoleName(e.target.value)}
            className="block bg-fblack rounded-md p-1 border-1 border-fgray focus:border-fblue"
          />
          <label
            htmlFor="roleIcon"
            className="block mt-4 text-flightgray text-sm"
          >
            Role icon
            <div
              tabIndex={0}
              className="block w-full text-base text-fwhite bg-fblack rounded-md p-1 border-1 border-fgray focus:border-fblue hover:cursor-pointer"
            >
              {file ? file.name : "Select an image"}
            </div>
          </label>
          <input
            type="file"
            className=" hidden"
            id="roleIcon"
            accept="image/png"
            onChange={onChangeFile}
          />
        </div>
        <div className="flex-grow">
          <span className="text-sm font-semibold text-flightgray">Preview</span>
          <div
            className="py-2 sm:py-4 px-2 sm:px-6 mt-3 flex items-center font-gg overflow-hidden whitespace-nowrap rounded-md"
            style={{ backgroundColor: "#313338" }}
          >
            <img
              src={user.picture}
              className="rounded-full w-10 h-10 mr-3.5"
            />
            <div className="flex flex-col justify-center">
              <div className="flex items-center">
                <span
                  style={{
                    color: color,
                    fontSize: "16px",
                    fontWeight: "500",
                    lineHeight: "1.375rem",
                  }}
                >
                  {user.nickname}
                </span>
                {image && (
                  <img
                    src={image}
                    className="ml-1 w-5 h-5"
                  />
                )}
                <span
                  className="ml-1"
                  style={{
                    color: "rgb(148,155,164)",
                    fontSize: "12px",
                    fontWeight: "500",
                  }}
                >
                  Yesterday at 3:42 PM
                </span>
              </div>
              <p
                style={{
                  color: "#dbdee1",
                  fontSize: "16px",
                  fontWeight: "400",
                  lineHeight: "1.375rem",
                }}
              >
                Hello, world!
              </p>
            </div>
          </div>
          <div
            className="py-2 sm:py-4 px-2 sm:px-6 mt-3 flex items-center font-gg overflow-hidden whitespace-nowrap rounded-md"
            style={{ backgroundColor: "#111214" }}
          >
            <div
              className="flex justify-center items-center space-x-1 py-1 px-2 rounded"
              style={{ backgroundColor: "#232428" }}
            >
              <div
                className="rounded-full w-3 h-3"
                style={{ backgroundColor: color }}
              ></div>
              {image && (
                <img
                  className="w-4 h-4"
                  src={image}
                />
              )}
              <span
                style={{
                  color: "#DBDEE1",
                  fontSize: "12px",
                  fontWeight: 500,
                  lineHeight: "16px",
                }}
              >
                {roleName}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          onClick={() => submit()}
          className="rounded-md bg-fblue px-3 py-2 text-sm font-semibold text-fwhite shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-fblue disabled:bg-flightgray disabled:animate-pulse w-28 text-center"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save changes"}
        </button>
      </div>
    </div>
  )
}
