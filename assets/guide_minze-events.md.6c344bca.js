import{_ as n,c as s,o as a,a as t}from"./app.9e2a54b3.js";const f='{"title":"Events","description":"","frontmatter":{},"headers":[],"relativePath":"guide/minze-events.md"}',e={},p=t(`<h1 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-hidden="true">#</a></h1><p>The Minze class has an abstraction layer for custom events, which can be invoked by calling its static methods. This can be useful for listening to events casted from custom components. All event listeners created by <code>Minzes</code> static methods will be attached to the <code>window</code> object.</p><p>See the <a href="/api/#cast">API Reference</a> for more information.</p><p><strong>Example</strong></p><div class="language-js"><pre><code><span class="token comment">// some component</span>
<span class="token keyword">import</span> Minze<span class="token punctuation">,</span> <span class="token punctuation">{</span> MinzeElement <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;minze&#39;</span>

<span class="token keyword">class</span> <span class="token class-name">MyElement</span> <span class="token keyword">extends</span> <span class="token class-name">MinzeElement</span> <span class="token punctuation">{</span>
  <span class="token function">onReady</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">cast</span><span class="token punctuation">(</span><span class="token string">&#39;minze:ready&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

Minze<span class="token punctuation">.</span><span class="token function">defineAll</span><span class="token punctuation">(</span><span class="token punctuation">[</span>MyElement<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre></div><div class="language-js"><pre><code><span class="token comment">// some other js file</span>
<span class="token keyword">import</span> Minze <span class="token keyword">from</span> <span class="token string">&#39;minze&#39;</span>

<span class="token keyword">const</span> <span class="token function-variable function">handleCast</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;ready!&#39;</span><span class="token punctuation">)</span>
  Minze<span class="token punctuation">.</span><span class="token function">stopListen</span><span class="token punctuation">(</span><span class="token string">&#39;minze:ready&#39;</span><span class="token punctuation">,</span> handleCast<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

Minze<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token string">&#39;minze:ready&#39;</span><span class="token punctuation">,</span> handleCast<span class="token punctuation">)</span>
</code></pre></div><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>my-element</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>my-element</span><span class="token punctuation">&gt;</span></span>
</code></pre></div>`,7),o=[p];function c(l,i,u,k,r,d){return a(),s("div",null,o)}var h=n(e,[["render",c]]);export{f as __pageData,h as default};
