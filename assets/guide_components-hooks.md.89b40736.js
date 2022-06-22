import{_ as n,c as s,o as a,a as t}from"./app.9e2a54b3.js";var e="/hooks.svg",o="/hooks-dark.svg";const g='{"title":"Hooks","description":"","frontmatter":{},"headers":[{"level":2,"title":"Lifecycle","slug":"lifecycle"},{"level":2,"title":"Example","slug":"example"}],"relativePath":"guide/components-hooks.md"}',p={},c=t('<h1 id="hooks" tabindex="-1">Hooks <a class="header-anchor" href="#hooks" aria-hidden="true">#</a></h1><p>Hooks are methods that can be defined within a component and are called at various points in the lifecycle of a component. All hooks can be asynchronous.</p><p><strong>Run only once:</strong></p><ul><li><code>onStart</code></li><li><code>onReactive</code></li><li><code>onReady</code></li><li><code>onDestroy</code></li><li><code>onMove</code></li></ul><p><strong>Can run multiple times:</strong></p><ul><li><code>beforeRender</code></li><li><code>onRender</code></li><li><code>beforeAttributeChange</code></li><li><code>onAttributeChange</code></li></ul><h2 id="lifecycle" tabindex="-1">Lifecycle <a class="header-anchor" href="#lifecycle" aria-hidden="true">#</a></h2><p align="center"><img class="img-light" src="'+e+'"><img class="img-dark" src="'+o+`"></p><h2 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-hidden="true">#</a></h2><div class="language-js"><pre><code><span class="token keyword">import</span> Minze<span class="token punctuation">,</span> <span class="token punctuation">{</span> MinzeElement <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;minze&#39;</span>

<span class="token keyword">class</span> <span class="token class-name">MyElement</span> <span class="token keyword">extends</span> <span class="token class-name">MinzeElement</span> <span class="token punctuation">{</span>
  <span class="token comment">/**
   * Component has been inserted into the DOM,
   * but the internal lifecycle hasn&#39;t started yet.
   *
   * Runs once.
   */</span>
  <span class="token function">onStart</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;onStart&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/**
   * Reactive properties have been initialized.
   *
   * Runs once.
   */</span>
  <span class="token function">onReactive</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;onReactive&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/**
   * The internal lifecycle has finished,
   * and the component is rendered.
   *
   * Runs once.
   */</span>
  <span class="token function">onReady</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;onReady&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/**
   * The component is removed from the DOM.
   * All internally defined event listeners have been removed.
   *
   * Runs once.
   */</span>
  <span class="token function">onDestroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;onDestroy&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/**
   * The component is moved to a different document.
   * You probably won&#39;t need this hook often.
   *
   * Runs once.
   */</span>
  <span class="token function">onMove</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;onMove&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/**
   * The template hasn&#39;t been rendered yet
   * but is about to.
   *
   * Can run multiple times.
   */</span>
  <span class="token function">beforeRender</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;beforeRender&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/**
   * The template has been rendered.
   *
   * Can run multiple times.
   */</span>
  <span class="token function">onRender</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;onRender&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/**
   * An observed attribute has changed,
   * but the attribute property has not yet been updated.
   *
   * Can run multiple times.
   */</span>
  <span class="token function">beforeAttributeChange</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;beforeAttributeChange&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/**
   * An observed attribute has changed,
   * and the attribute property has been updated.
   *
   * Can run multiple times.
   */</span>
  <span class="token function">onAttributeChange</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;onAttributeChange&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

Minze<span class="token punctuation">.</span><span class="token function">defineAll</span><span class="token punctuation">(</span><span class="token punctuation">[</span>MyElement<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre></div><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>my-element</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>my-element</span><span class="token punctuation">&gt;</span></span>
</code></pre></div>`,11),l=[c];function i(u,k,r,d,m,h){return a(),s("div",null,l)}var b=n(p,[["render",i]]);export{g as __pageData,b as default};
