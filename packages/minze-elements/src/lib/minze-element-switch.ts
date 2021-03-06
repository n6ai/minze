import type { Reactive, Watch, EventListeners } from 'minze'
import { MinzeElement } from 'minze'
import css from './minze-element-switch.css'

export interface MinzeElementSwitch {
  overlayActive: boolean
  slottedElements: Element[] | null
  selectedElementKey: string | null
  selectedElement: string | null
}

/**
 * Element for switching between slotted elements.
 *
 * Useful during development.
 *
 * @example
 * ```html
 * <minze-element-switch>
 *   <my-element-1></my-element-1>
 *   <my-element-2></my-element-2>
 * </minze-element-switch>
 * ```
 */
export class MinzeElementSwitch extends MinzeElement {
  reactive: Reactive = [
    ['overlayActive', false],
    ['slottedElements', null],
    ['selectedElementKey', null],
    ['selectedElement', null]
  ]

  storageKey = 'MinzeElementSwitch:selectedElementKey'

  showOverlay = () => (this.overlayActive = true)
  hideOverlay = () => (this.overlayActive = false)

  watchSelectedElementKey = (newValue: string) => {
    const dashName = newValue
    const element = this.slottedElements
      ? this.slottedElements.filter(
          (element) => element.tagName.toLowerCase() === dashName
        )
      : null

    if (element?.length) {
      this.selectedElement = element[0].outerHTML
      sessionStorage.setItem(this.storageKey, dashName)
    } else {
      sessionStorage.removeItem(this.storageKey)
    }
  }

  watch: Watch = [['selectedElementKey', this.watchSelectedElementKey]]

  templateOverlay() {
    const template: string[] = []

    if (this.slottedElements?.length) {
      this.slottedElements.forEach((element) => {
        const dashName = element.tagName.toLowerCase()
        const isSelected = this.selectedElementKey === dashName

        template.push(/* html */ `
          <button data-name="${dashName}" ${isSelected ? 'class="active"' : ''}>
            ${dashName}
          </button>
        `)
      })
    } else {
      template.push(/* html */ `
        <div>
          No slotted elements found.
        </div>
      `)
    }

    return /* html */ `
      <div part="aside-overlay">
        ${template.join('')}
      </div>
    `
  }

  templateButton() {
    return /* html */ `
      <button part="aside-button">
        Select Element
      </button>
    `
  }

  html = () => /* html */ `
    <slot></slot>

    <aside part="aside">
      ${this.overlayActive ? this.templateOverlay() : this.templateButton()}
    </aside>

    <main part="main">
      ${this.selectedElement ? this.selectedElement : ''}
    </main>
  `

  // css defined externally
  css = css

  onReady() {
    const slot = this.select<HTMLSlotElement>('slot')
    if (slot) this.slottedElements = slot.assignedElements()

    const selectedElementKey = sessionStorage.getItem(this.storageKey)
    const firstElementdashName = this.slottedElements
      ? Object.values(this.slottedElements)[0].tagName.toLowerCase()
      : null
    this.selectedElementKey = selectedElementKey ?? firstElementdashName
  }

  switchElement = (event: Event) => {
    const button = event.target as HTMLButtonElement
    const dashName = button.dataset.name

    if (dashName) {
      this.selectedElementKey = dashName
      this.hideOverlay()
    }
  }

  // close overlay on click outside
  handleClickAway = (event: Event) => {
    const path = event.composedPath()

    if (this.overlayActive) {
      const clickOnOverlay = path.filter((el) => {
        return el instanceof HTMLElement && el.part.value === 'aside-overlay'
      })

      if (!clickOnOverlay.length) this.hideOverlay()
    }
  }

  eventListeners: EventListeners = [
    ['[part=aside-button]', 'click', this.showOverlay],
    ['[part=aside-overlay] button', 'click', this.switchElement],
    [window, 'click', this.handleClickAway]
  ]
}
