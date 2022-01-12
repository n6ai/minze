/**
 * Deeply patches the shadow root DOM.
 * Tries to gracefully replace, before hard replacing.
 *
 * @example
 * ```
 * deepPatch(template, shadowRoot)
 * ```
 */
export function deepPatch(
  template: (() => string) | string,
  shadowRoot: ShadowRoot
) {
  const renderedTemplate =
    typeof template === 'function' ? template() : template

  const newTemplate = document.createElement('template')
  newTemplate.innerHTML = renderedTemplate

  deepPatchText(newTemplate, shadowRoot)
  deepPatchElement(newTemplate, shadowRoot)
}

/**
 * Deeply patches text nodes.
 *
 * If a new template/node has a text node that is not equal to the old template/node,
 * the old text node content is replaced with the new text node content.
 *
 * @example
 * ```
 * deepPatchText(newTemplate, oldTemplate)
 * ```
 */
function deepPatchText(
  newTemplate: HTMLTemplateElement | Node,
  oldTemplate: ShadowRoot | Node
) {
  const isTemplateEl = newTemplate instanceof HTMLTemplateElement
  const newTemplateChildNodes = isTemplateEl
    ? newTemplate.content.childNodes
    : newTemplate.childNodes

  // if the amount of children doesn't match, skip graceful patching
  if (newTemplateChildNodes.length !== oldTemplate.childNodes.length) {
    oldTemplate.textContent = newTemplate.textContent
    return
  }

  Array.from(newTemplateChildNodes).forEach((node, index) => {
    const newNode = node
    const oldNode = oldTemplate.childNodes[index]
    const isEqual = newNode.isEqualNode(oldNode)

    if (!isEqual) {
      if (
        oldNode.nodeType === Node.TEXT_NODE ||
        oldNode.nodeType === Node.COMMENT_NODE
      ) {
        oldNode.textContent = newNode.textContent
      } else if (oldNode.nodeType === Node.ELEMENT_NODE) {
        deepPatchText(newNode, oldNode)
      }
    }
  })
}

/**
 * Deeply patches elements.
 *
 * If a new template has an element that is not equal to the old template element,
 * the old element is gracefully replaced with the new element.
 *
 * @example
 * ```
 * deepPatchElement(newTemplate, oldTemplate)
 * ```
 */
function deepPatchElement(
  newTemplate: HTMLTemplateElement | Element,
  oldTemplate: ShadowRoot | Element
) {
  const isTemplateEl = newTemplate instanceof HTMLTemplateElement
  const newTemplateChildren = isTemplateEl
    ? newTemplate.content.children
    : newTemplate.children

  // if the amount of children doesn't match, skip graceful patching
  if (newTemplateChildren.length !== oldTemplate.children.length) {
    oldTemplate.innerHTML = newTemplate.innerHTML
    return
  }

  Array.from(newTemplateChildren).some((element, index) => {
    const newEl = element
    const oldEl = oldTemplate.children[index]
    const isEqual = newEl.isEqualNode(oldEl)

    if (!isEqual) {
      // if the new element and the old element aren't from the same type,
      // replace the old element with the new one and stop patching
      if (newEl.nodeName !== oldEl.nodeName) {
        oldEl.replaceWith(newEl)
        return
      }

      Array.from(newEl.attributes).forEach((attr) => {
        if (attr.value !== oldEl.getAttribute(attr.name)) {
          oldEl.setAttribute(attr.name, attr.value)
        }
      })

      Array.from(oldEl.attributes).forEach((attr) => {
        if (!newEl.hasAttribute(attr.name)) {
          oldEl.removeAttribute(attr.name)
        }
      })

      deepPatchElement(newEl, oldEl)
    }
  })
}
