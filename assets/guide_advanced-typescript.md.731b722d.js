import{_ as n,c as s,o as a,a as t}from"./app.9e2a54b3.js";const y='{"title":"TypeScript","description":"","frontmatter":{},"headers":[],"relativePath":"guide/advanced-typescript.md"}',e={},p=t(`<h1 id="typescript" tabindex="-1">TypeScript <a class="header-anchor" href="#typescript" aria-hidden="true">#</a></h1><p>This section assumes you already have a basic understanding of TypeScript. The process of writing Minze components in TypeScript is similar to writing them in vanilla JavaScript.</p><p>There are two main differences:</p><ol><li>The types for <code>reactive</code>, <code>attrs</code>, <code>watch</code> and <code>eventListeners</code> have to be explicitly declared. You can do so by using <a href="/api/#type-helpers">Type Helpers</a> provided with Minze.</li><li>Reactive properties and attributes are created dynamically so you have to explicitly declare their types in a separate <code>interface</code> named after the component and export it.</li></ol><p>By going through and understanding the example below, you will have a firm grasp of how to work with Minze components in TypeScript.</p><p><strong>Example</strong></p><div class="language-ts"><pre><code><span class="token comment">/**
 * We are importing the base MinzeElement class
 * plus some tuple-type helpers.
 */</span>
<span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token punctuation">{</span> Reactive<span class="token punctuation">,</span> Attrs<span class="token punctuation">,</span> Watch<span class="token punctuation">,</span> EventListeners <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;minze&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> MinzeElement <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;minze&#39;</span>

<span class="token comment">/**
 * Since all reactive properties and attribute properties
 * are defined dynamically, we are defining
 * their types separately in an interface.
 *
 * With the exception of undefined, null, false or true
 * all attribute properties will always be strings
 * no matter the initial value.
 */</span>
<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">MyElement</span> <span class="token punctuation">{</span>
  <span class="token comment">// reactive properties</span>
  aBoolean<span class="token operator">:</span> <span class="token builtin">boolean</span>
  anObject<span class="token operator">:</span> <span class="token punctuation">{</span>
    foo<span class="token operator">:</span> <span class="token builtin">string</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// reactive attribute properties</span>
  text<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">null</span>
  bgColor<span class="token operator">:</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token comment">/**
 * Here we are defining the custom component.
 */</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">MyElement</span> <span class="token keyword">extends</span> <span class="token class-name">MinzeElement</span> <span class="token punctuation">{</span>
  <span class="token comment">/**
   * Reactive properties have to be explicitly defined
   * as a mixed array of strings and tuples.
   * Otherwise, TypeScript will infer them as an array of strings and arrays.
   */</span>
  reactive<span class="token operator">:</span> Reactive <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">[</span><span class="token string">&#39;aBoolean&#39;</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token string">&#39;anObject&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> foo<span class="token operator">:</span> <span class="token string">&#39;bar&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">]</span>
  <span class="token punctuation">]</span>

  <span class="token comment">/**
   * Reactive attribute properties have to be explicitly defined
   * as a mixed array of strings and tuples.
   * Otherwise, TypeScript will infer them as an array of strings and arrays.
   */</span>
  attrs<span class="token operator">:</span> Attrs <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;text&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">&#39;bg-color&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;#000&#39;</span><span class="token punctuation">]</span><span class="token punctuation">]</span>

  <span class="token comment">/**
   * Here we are defining which attributes should be observed.
   */</span>
  <span class="token keyword">static</span> observedAttributes <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;text&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;bg-color&#39;</span><span class="token punctuation">]</span>

  <span class="token comment">/**
   * Watchers have to be explicitly defined as an array of tuples.
   * Otherwise, TypeScript will infer them as an array of arrays.
   */</span>
  watch<span class="token operator">:</span> Watch <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token string">&#39;aBoolean&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">]</span>

  <span class="token comment">/**
   * A click callback handler.
   * We are (broad)casting a custom event on click.
   */</span>
  <span class="token function-variable function">handleClick</span> <span class="token operator">=</span> <span class="token punctuation">(</span>event<span class="token operator">:</span> Event<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span>
    <span class="token keyword">const</span> myDetailData <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>anObject
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">cast</span><span class="token punctuation">(</span><span class="token string">&#39;minze:click&#39;</span><span class="token punctuation">,</span> myDetailData<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/**
   * A (broad)cast callback handler.
   * The event is a CustomEvent so we have to type cast it to such,
   * before accessing the detail data.
   */</span>
  <span class="token function-variable function">handleCast</span> <span class="token operator">=</span> <span class="token punctuation">(</span>event<span class="token operator">:</span> Event<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> detail <span class="token operator">=</span> <span class="token punctuation">(</span>event <span class="token keyword">as</span> CustomEvent<span class="token punctuation">)</span><span class="token punctuation">.</span>detail
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>detail<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/**
   * eventListeners have to be explicitly defined as an array of tuples.
   * Otherwise, TypeScript will infer them as an array of arrays.
   */</span>
  eventListeners<span class="token operator">:</span> EventListeners <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">[</span><span class="token string">&#39;.button&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>handleClick<span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token string">&#39;minze:click&#39;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>handleCast<span class="token punctuation">]</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-ts"><pre><code><span class="token keyword">import</span> Minze <span class="token keyword">from</span> <span class="token string">&#39;minze&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> MyElement <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./my-element&#39;</span>

Minze<span class="token punctuation">.</span><span class="token function">defineAll</span><span class="token punctuation">(</span><span class="token punctuation">[</span>MyElement<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre></div><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>my-element</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>my-element</span><span class="token punctuation">&gt;</span></span>
</code></pre></div>`,9),o=[p];function c(i,l,r,u,k,d){return a(),s("div",null,o)}var h=n(e,[["render",c]]);export{y as __pageData,h as default};
