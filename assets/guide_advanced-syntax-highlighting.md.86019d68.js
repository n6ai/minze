import{_ as n,c as a,o as s,a as t}from"./app.9e2a54b3.js";const h='{"title":"Syntax Highlighting","description":"","frontmatter":{},"headers":[{"level":2,"title":"VS Code","slug":"vs-code"},{"level":3,"title":"Comment tagged templates","slug":"comment-tagged-templates"}],"relativePath":"guide/advanced-syntax-highlighting.md"}',e={},p=t(`<h1 id="syntax-highlighting" tabindex="-1">Syntax Highlighting <a class="header-anchor" href="#syntax-highlighting" aria-hidden="true">#</a></h1><p>Once your HTML and CSS templates grow in size you might want to add some syntax highlighting.</p><h2 id="vs-code" tabindex="-1">VS Code <a class="header-anchor" href="#vs-code" aria-hidden="true">#</a></h2><h3 id="comment-tagged-templates" tabindex="-1">Comment tagged templates <a class="header-anchor" href="#comment-tagged-templates" aria-hidden="true">#</a></h3><p>With the following extension you can add syntax highlighting to tagged template strings using language identifier comments:</p><ul><li><a href="https://marketplace.visualstudio.com/items?itemName=bierner.comment-tagged-templates" target="_blank" rel="noopener noreferrer">Comment tagged templates</a></li></ul><p><strong>Example</strong></p><div class="language-js"><pre><code><span class="token keyword">import</span> Minze<span class="token punctuation">,</span> <span class="token punctuation">{</span> MinzeElement <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;minze&#39;</span>

<span class="token keyword">class</span> <span class="token class-name">MyElement</span> <span class="token keyword">extends</span> <span class="token class-name">MinzeElement</span> <span class="token punctuation">{</span>
  <span class="token function">html</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token comment">/* html */</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    &lt;div&gt;Hello Minze!&lt;/div&gt;
  </span><span class="token template-punctuation string">\`</span></span>

  <span class="token function">css</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token comment">/* css */</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    :host {
      display: flex;
    }
  </span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span>

Minze<span class="token punctuation">.</span><span class="token function">defineAll</span><span class="token punctuation">(</span><span class="token punctuation">[</span>MyElement<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre></div>`,8),o=[p];function i(l,c,r,g,d,m){return s(),a("div",null,o)}var k=n(e,[["render",i]]);export{h as __pageData,k as default};
