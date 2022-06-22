import{_ as n,c as s,o as a,a as t}from"./app.9e2a54b3.js";const m='{"title":"Storage","description":"","frontmatter":{},"headers":[{"level":2,"title":"Session Storage","slug":"session-storage"},{"level":2,"title":"Local Storage","slug":"local-storage"}],"relativePath":"guide/advanced-storage.md"}',e={},p=t(`<h1 id="storage" tabindex="-1">Storage <a class="header-anchor" href="#storage" aria-hidden="true">#</a></h1><p>You can use the JavaScript native <code>sessionStorage</code> or <code>localStorage</code> properties for accessing the Storage object.</p><h2 id="session-storage" tabindex="-1">Session Storage <a class="header-anchor" href="#session-storage" aria-hidden="true">#</a></h2><p>The stored data is cleared when the page session ends.</p><p><strong>Example</strong></p><div class="language-js"><pre><code><span class="token keyword">import</span> Minze<span class="token punctuation">,</span> <span class="token punctuation">{</span> MinzeElement <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;minze&#39;</span>

<span class="token keyword">class</span> <span class="token class-name">MyElement</span> <span class="token keyword">extends</span> <span class="token class-name">MinzeElement</span> <span class="token punctuation">{</span>
  <span class="token function">onStart</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    sessionStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">&#39;minze:msg&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Helo Minze!&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token function">onReady</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> msg <span class="token operator">=</span> sessionStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">&#39;minze:msg&#39;</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span> <span class="token comment">// Helo Minze!</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

Minze<span class="token punctuation">.</span><span class="token function">defineAll</span><span class="token punctuation">(</span><span class="token punctuation">[</span>MyElement<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre></div><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>my-element</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>my-element</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><h2 id="local-storage" tabindex="-1">Local Storage <a class="header-anchor" href="#local-storage" aria-hidden="true">#</a></h2><p>The stored data is saved across browser sessions.</p><p><strong>Example</strong></p><div class="language-js"><pre><code><span class="token keyword">import</span> Minze<span class="token punctuation">,</span> <span class="token punctuation">{</span> MinzeElement <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;minze&#39;</span>

<span class="token keyword">class</span> <span class="token class-name">MyElement</span> <span class="token keyword">extends</span> <span class="token class-name">MinzeElement</span> <span class="token punctuation">{</span>
  <span class="token function">onStart</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">&#39;minze:msg&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Helo Minze!&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token function">onReady</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> msg <span class="token operator">=</span> localStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">&#39;minze:msg&#39;</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span> <span class="token comment">// Helo Minze!</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

Minze<span class="token punctuation">.</span><span class="token function">defineAll</span><span class="token punctuation">(</span><span class="token punctuation">[</span>MyElement<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre></div><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>my-element</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>my-element</span><span class="token punctuation">&gt;</span></span>
</code></pre></div>`,12),o=[p];function c(l,i,u,k,r,d){return a(),s("div",null,o)}var h=n(e,[["render",c]]);export{m as __pageData,h as default};
