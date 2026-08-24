"use client"

import * as React from "react"

import { IconZoomIn, IconZoomOut } from "@tabler/icons-react"
import Lightbox, {
  IconButton as LightboxIconButton,
  type SlideImage,
  useZoom,
} from "yet-another-react-lightbox-lite"

import { cn } from "@/lib/utils"

import "yet-another-react-lightbox-lite/styles.css"

const triggerSelector = "img[data-mdx-image-viewer-trigger]"

type MdxImageViewerProps = React.ComponentPropsWithoutRef<"div">

type PreservedAttributes = {
  image: HTMLImageElement
  ariaHasPopup: string | null
  ariaLabel: string | null
  role: string | null
  tabIndex: string | null
}

function isViewableImage(image: HTMLImageElement): boolean {
  return (
    Boolean(image.alt.trim()) &&
    image.getAttribute("aria-hidden") !== "true" &&
    image.getAttribute("role") !== "presentation" &&
    !image.matches(".twemoji, [data-twemoji]") &&
    !image.closest("a, button, [role='button']")
  )
}

function restoreAttribute(element: Element, name: string, value: string | null) {
  if (value === null) {
    element.removeAttribute(name)
  } else {
    element.setAttribute(name, value)
  }
}

function getTriggerImage(target: EventTarget | null): HTMLImageElement | undefined {
  return target instanceof Element
    ? (target.closest<HTMLImageElement>(triggerSelector) ?? undefined)
    : undefined
}

function getImageSlide(image: HTMLImageElement): SlideImage {
  const width = Number(image.getAttribute("width")) || image.naturalWidth || undefined
  const height = Number(image.getAttribute("height")) || image.naturalHeight || undefined

  return {
    src: image.dataset.mdxImageSrc || image.currentSrc || image.src,
    alt: image.alt,
    width,
    height,
  }
}

function ZoomButtons() {
  const { zoom, maxZoom, changeZoom } = useZoom()

  return (
    <>
      <LightboxIconButton
        label="Zoom out"
        icon={IconZoomOut}
        disabled={zoom <= 1}
        onClick={() => changeZoom(Math.max(1, zoom / 2))}
      />
      <LightboxIconButton
        label="Zoom in"
        icon={IconZoomIn}
        disabled={zoom >= maxZoom}
        onClick={() => changeZoom(Math.min(maxZoom, zoom * 2))}
      />
    </>
  )
}

export function MdxImageViewer({ className, children, ...props }: MdxImageViewerProps) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const [slide, setSlide] = React.useState<SlideImage>()

  React.useEffect(() => {
    const root = rootRef.current

    if (!root || children === undefined) {
      return undefined
    }

    const viewerRoot: HTMLDivElement = root
    const images = Array.from(viewerRoot.querySelectorAll("img"))
      .filter(isViewableImage)
      .map((image): PreservedAttributes => ({
        image,
        ariaHasPopup: image.getAttribute("aria-haspopup"),
        ariaLabel: image.getAttribute("aria-label"),
        role: image.getAttribute("role"),
        tabIndex: image.getAttribute("tabindex"),
      }))

    for (const { image } of images) {
      image.dataset.mdxImageViewerTrigger = ""
      image.setAttribute("aria-haspopup", "dialog")
      image.setAttribute("aria-label", `View image: ${image.alt}`)
      image.setAttribute("role", "button")
      image.tabIndex = 0
    }

    function openImage(image: HTMLImageElement) {
      if (viewerRoot.contains(image)) {
        setSlide(getImageSlide(image))
      }
    }

    function handleClick(event: MouseEvent) {
      const image = getTriggerImage(event.target)

      if (image) {
        openImage(image)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Enter" && event.key !== " ") {
        return
      }

      const image = getTriggerImage(event.target)

      if (image) {
        event.preventDefault()
        openImage(image)
      }
    }

    viewerRoot.addEventListener("click", handleClick)
    viewerRoot.addEventListener("keydown", handleKeyDown)

    return () => {
      viewerRoot.removeEventListener("click", handleClick)
      viewerRoot.removeEventListener("keydown", handleKeyDown)

      for (const { image, ariaHasPopup, ariaLabel, role, tabIndex } of images) {
        delete image.dataset.mdxImageViewerTrigger
        restoreAttribute(image, "aria-haspopup", ariaHasPopup)
        restoreAttribute(image, "aria-label", ariaLabel)
        restoreAttribute(image, "role", role)
        restoreAttribute(image, "tabindex", tabIndex)
      }
    }
  }, [children])

  return (
    <>
      <div
        ref={rootRef}
        className={cn(
          "[&_img[data-mdx-image-viewer-trigger]]:cursor-zoom-in",
          "[&_img[data-mdx-image-viewer-trigger]]:transition-opacity",
          "[&_img[data-mdx-image-viewer-trigger]]:duration-200",
          "[&_img[data-mdx-image-viewer-trigger]]:outline-none",
          "[&_img[data-mdx-image-viewer-trigger]:hover]:opacity-95",
          "[&_img[data-mdx-image-viewer-trigger]:focus-visible]:ring-3",
          "[&_img[data-mdx-image-viewer-trigger]:focus-visible]:ring-ring/50",
          className
        )}
        {...props}
      >
        {children}
      </div>

      <Lightbox
        slides={slide ? [slide] : []}
        index={slide ? 0 : undefined}
        setIndex={(nextIndex) => {
          if (nextIndex === undefined) {
            setSlide(undefined)
          }
        }}
        toolbar={{ buttons: [<ZoomButtons key="zoom" />] }}
        carousel={{ preload: 0 }}
        zoom={{ maxZoom: 4 }}
        slots={{
          portal: {
            style: {
              "--yarll__backdrop_color": "oklch(0.12 0.01 286 / 0.96)",
              "--yarll__button_background_color": "rgb(255 255 255 / 0.1)",
              "--yarll__button_color": "rgb(255 255 255 / 0.8)",
              "--yarll__button_color_active": "white",
              "--yarll__button_filter": "none",
              "--yarll__button_focus_box_shadow": "0 0 0 3px rgb(255 255 255 / 0.5)",
              "--yarll__button_focus_outline": "none",
              "--yarll__fade_duration": "200ms",
              "--yarll__icon_size": "24px",
              "--yarll__portal_zindex": 60,
              "--yarll__toolbar_margin": "16px",
            },
          },
          button: {
            className: "rounded-md transition-colors hover:bg-white/20",
          },
          image: {
            className: "rounded-lg shadow-2xl",
          },
        }}
      />
    </>
  )
}
