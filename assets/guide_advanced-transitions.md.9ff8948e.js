import{_ as n,c as s,o as a,a as t}from"./app.9e2a54b3.js";const g='{"title":"Transitions","description":"","frontmatter":{},"headers":[{"level":2,"title":"Local","slug":"local"},{"level":2,"title":"Global","slug":"global"}],"relativePath":"guide/advanced-transitions.md"}',p={},e=t(`<h1 id="transitions" tabindex="-1">Transitions <a class="header-anchor" href="#transitions" aria-hidden="true">#</a></h1><p>You can determine how components should appear when they are rendered. This can be especially useful if you are using an async call to an external API and are awaiting an answer.</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>CSS transitions are not 100% reliable, since a transition isn&#39;t triggered when the component is immediately rendered.</p></div><h2 id="local" tabindex="-1">Local <a class="header-anchor" href="#local" aria-hidden="true">#</a></h2><p>Animations can be added per component.</p><p><strong>Example</strong></p><div class="language-js"><pre><code><span class="token keyword">import</span> Minze<span class="token punctuation">,</span> <span class="token punctuation">{</span> MinzeElement <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;minze&#39;</span>

<span class="token keyword">class</span> <span class="token class-name">MyElement</span> <span class="token keyword">extends</span> <span class="token class-name">MinzeElement</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">html</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;div&gt;Hello Minze!&lt;/div&gt;</span><span class="token template-punctuation string">\`</span></span>

  <span class="token function-variable function">css</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    :host {
      animation: minze-rendered 0.25s ease-in;
    }

    @keyframes minze-rendered {
      0% {
        opacity: 0%;
        transform: translateY(100%);
      }
      100% {
        opacity: 100%;
        transform: translateY(0);
      }
    }
  </span><span class="token template-punctuation string">\`</span></span>

  <span class="token keyword">async</span> <span class="token function">onStart</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> delay <span class="token operator">=</span> <span class="token number">500</span> <span class="token comment">// ms</span>
    <span class="token keyword">await</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> delay<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

Minze<span class="token punctuation">.</span><span class="token function">defineAll</span><span class="token punctuation">(</span><span class="token punctuation">[</span>MyElement<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre></div><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>my-element</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>my-element</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><h2 id="global" tabindex="-1">Global <a class="header-anchor" href="#global" aria-hidden="true">#</a></h2><p>By exposing the <code>rendered</code> attribute you can add animations to all rendered components, or define more specific rules.</p><p><strong>Example</strong></p><div class="language-js"><pre><code><span class="token keyword">import</span> Minze<span class="token punctuation">,</span> <span class="token punctuation">{</span> MinzeElement <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;minze&#39;</span>

<span class="token keyword">class</span> <span class="token class-name">MyElement</span> <span class="token keyword">extends</span> <span class="token class-name">MinzeElement</span> <span class="token punctuation">{</span>
  options <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">exposeAttrs</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">rendered</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token function-variable function">html</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;div&gt;Hello Minze!&lt;/div&gt;</span><span class="token template-punctuation string">\`</span></span>

  <span class="token keyword">async</span> <span class="token function">onStart</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> delay <span class="token operator">=</span> <span class="token number">500</span> <span class="token comment">// ms</span>
    <span class="token keyword">await</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> delay<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

Minze<span class="token punctuation">.</span><span class="token function">defineAll</span><span class="token punctuation">(</span><span class="token punctuation">[</span>MyElement<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre></div><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>my-element</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>my-element</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><div class="language-css"><pre><code><span class="token comment">/* hide all custom web components until they are defined */</span>
<span class="token selector">:not(:defined)</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">[rendered]</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>
  <span class="token property">animation</span><span class="token punctuation">:</span> minze-rendered 0.25s ease-in<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token atrule"><span class="token rule">@keyframes</span> minze-rendered</span> <span class="token punctuation">{</span>
  <span class="token selector">0%</span> <span class="token punctuation">{</span>
    <span class="token property">opacity</span><span class="token punctuation">:</span> 0%<span class="token punctuation">;</span>
    <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translateY</span><span class="token punctuation">(</span>100%<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">100%</span> <span class="token punctuation">{</span>
    <span class="token property">opacity</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
    <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translateY</span><span class="token punctuation">(</span>0<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div>`,14),o=[e];function c(l,i,u,r,k,d){return a(),s("div",null,o)}var y=n(p,[["render",c]]);export{g as __pageData,y as default};
