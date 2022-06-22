import{_ as n,c as s,o as a,a as t}from"./app.9e2a54b3.js";const m='{"title":"Options","description":"","frontmatter":{},"headers":[],"relativePath":"guide/components-options.md"}',e={},p=t(`<h1 id="options" tabindex="-1">Options <a class="header-anchor" href="#options" aria-hidden="true">#</a></h1><p>Individual components can be customized by declaring an options property. See all currently available options in the <a href="/api/#options">API Reference</a>.</p><div class="language-js"><pre><code><span class="token keyword">import</span> Minze<span class="token punctuation">,</span> <span class="token punctuation">{</span> MinzeElement <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;minze&#39;</span>

<span class="token keyword">class</span> <span class="token class-name">MyElement</span> <span class="token keyword">extends</span> <span class="token class-name">MinzeElement</span> <span class="token punctuation">{</span>
  options <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">exposeAttrs</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">rendered</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

Minze<span class="token punctuation">.</span><span class="token function">defineAll</span><span class="token punctuation">(</span><span class="token punctuation">[</span>MyElement<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre></div><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>my-element</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>my-element</span><span class="token punctuation">&gt;</span></span>
</code></pre></div>`,4),o=[p];function c(l,i,r,u,k,d){return a(),s("div",null,o)}var y=n(e,[["render",c]]);export{m as __pageData,y as default};
