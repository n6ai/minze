/**
 * Deeply patches the shadow root DOM.
 * Tries to gracefully replace, before hard replacing.
 *
 * @param newTemplate - The new template.
 * @param oldTemplate - The old template.
 * @param shadowRoot - The current shadow root.
 *
 * @example
 * ```
 * deepPatch(newTemplate, oldTemplate, shadowRoot)
 * ```
 */
export function deepPatch(
  newTemplate: (() => string) | string,
  oldTemplate: (() => string) | string,
  shadowRoot: ShadowRoot
) {
  const render = (template: (() => string) | string) => {
    template = typeof template === 'function' ? template() : template
    const renderedTemplate = document.createElement('template')
    renderedTemplate.innerHTML = template
    return renderedTemplate
  }

  deepPatchText(render(newTemplate), shadowRoot)
  deepPatchElement(render(newTemplate), render(oldTemplate), shadowRoot)
}

/**
 * Deeply patches text nodes.
 *
 * If a new template/node has a text node that is not equal to the current template/node,
 * the current text node content is replaced with the new text node content.
 *
 * @param newTemplate - The new template.
 * @param currentTemplate - The current shadow root or a Node of the shadow root.
 *
 * @example
 * ```
 * deepPatchText(newTemplate, currentTemplate)
 * ```
 */
function deepPatchText(
  newTemplate: HTMLTemplateElement | Node,
  currentTemplate: ShadowRoot | Node
) {
  const isTemplateEl = newTemplate instanceof HTMLTemplateElement
  const newTemplateChildNodes = isTemplateEl
    ? newTemplate.content.childNodes
    : newTemplate.childNodes

  // if the amount of children doesn't match, skip graceful patching
  if (newTemplateChildNodes.length !== currentTemplate.childNodes.length) {
    currentTemplate.textContent = newTemplate.textContent
    return
  }

  Array.from(newTemplateChildNodes).forEach((node, index) => {
    const newNode = node
    const currentNode = currentTemplate.childNodes[index]
    const isEqual = newNode.isEqualNode(currentNode)

    if (!isEqual) {
      if (
        currentNode.nodeType === Node.TEXT_NODE ||
        currentNode.nodeType === Node.COMMENT_NODE
      ) {
        currentNode.textContent = newNode.textContent
      } else if (currentNode.nodeType === Node.ELEMENT_NODE) {
        deepPatchText(newNode, currentNode)
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
 * @param newTemplate - The new template.
 * @param oldTemplate - The old template.
 * @param currentTemplate - The current shadow root or a Node of the shadow root.
 *
 * @example
 * ```
 * deepPatchElement(newTemplate, oldTemplate, currentTemplate)
 * ```
 */
function deepPatchElement(
  newTemplate: HTMLTemplateElement | Element,
  oldTemplate: HTMLTemplateElement | Element,
  currentTemplate: ShadowRoot | Element
) {
  const children = (template: HTMLTemplateElement | Element) => {
    return template instanceof HTMLTemplateElement
      ? template.content.children
      : template.children
  }

  const newTemplateChildren = children(newTemplate)
  const oldTemplateChildren = children(oldTemplate)

  // if the amount of children doesn't match, skip graceful patching
  if (newTemplateChildren.length !== currentTemplate.children.length) {
    currentTemplate.innerHTML = newTemplate.innerHTML
    return
  }

  Array.from(newTemplateChildren).some((element, index) => {
    const newEl = element
    const oldEl = oldTemplateChildren[index]
    const currentEl = currentTemplate.children[index]
    const isEqual = newEl.isEqualNode(currentEl)

    if (!isEqual) {
      // if the new element and the current element aren't from the same type,
      // replace the current element with the new one and stop patching
      if (newEl.nodeName !== currentEl.nodeName) {
        currentEl.replaceWith(newEl)
        return
      }

      Array.from(newEl.attributes).forEach((attr) => {
        if (attr.value !== currentEl.getAttribute(attr.name)) {
          currentEl.setAttribute(attr.name, attr.value)
        }
      })

      Array.from(currentEl.attributes).forEach((attr) => {
        if (!newEl.hasAttribute(attr.name) && oldEl.hasAttribute(attr.name)) {
          currentEl.removeAttribute(attr.name)
        }
      })

      deepPatchElement(newEl, oldEl, currentEl)
    }
  })
}
