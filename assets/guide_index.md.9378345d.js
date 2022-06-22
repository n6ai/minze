import{_ as n,c as e,o as t,a}from"./app.9e2a54b3.js";const h='{"title":"Quick Start","description":"","frontmatter":{},"headers":[{"level":2,"title":"Try Minze online","slug":"try-minze-online"},{"level":2,"title":"Scaffolding a project","slug":"scaffolding-a-project"},{"level":2,"title":"Creating a component","slug":"creating-a-component"}],"relativePath":"guide/index.md"}',s={},o=a(`<h1 id="quick-start" tabindex="-1">Quick Start <a class="header-anchor" href="#quick-start" aria-hidden="true">#</a></h1><h2 id="try-minze-online" tabindex="-1">Try Minze online <a class="header-anchor" href="#try-minze-online" aria-hidden="true">#</a></h2><p>Quickly check out what&#39;s Minze all about.</p><table><thead><tr><th>Site</th><th></th><th></th></tr></thead><tbody><tr><td>StackBlitz</td><td><a href="https://stackblitz.com/github/n6ai/minze/tree/main/packages/create-minze/template-js?title=Minze&amp;terminal=dev" target="_blank" rel="noopener noreferrer">JavaScript</a></td><td><a href="https://stackblitz.com/github/n6ai/minze/tree/main/packages/create-minze/template-ts?title=Minze&amp;terminal=dev" target="_blank" rel="noopener noreferrer">TypeScript</a></td></tr><tr><td>CodePen</td><td><a href="https://codepen.io/sergejcodes/pen/WNZVjPo" target="_blank" rel="noopener noreferrer">JavaScript</a></td><td></td></tr><tr><td>WebComponents.dev</td><td><a href="https://webcomponents.dev/edit/0W3vWxuoJlmRHGmgLVVx/src/index.js?p=stories" target="_blank" rel="noopener noreferrer">JavaScript</a></td><td></td></tr></tbody></table><h2 id="scaffolding-a-project" tabindex="-1">Scaffolding a project <a class="header-anchor" href="#scaffolding-a-project" aria-hidden="true">#</a></h2><p>The easiest way to get started locally is to scaffold a new Minze Dev and Publishing environment. It comes with everything you need to develop custom web components and publish them to npm. Out of the box, it comes with <a href="https://rollupjs.org/" target="_blank" rel="noopener noreferrer">rollup</a> and <a href="https://vitejs.dev/" target="_blank" rel="noopener noreferrer">vite</a>.</p><blockquote><p>Minze requires <a href="https://nodejs.dev/" target="_blank" rel="noopener noreferrer">Node.js</a> version &gt;= <code>16.0.0</code></p></blockquote><p>Follow these steps in your command line to get started.</p><p><strong>npm</strong></p><div class="language-bash"><pre><code>$ <span class="token function">npm</span> init minze@latest my-project -- --template js
$ <span class="token builtin class-name">cd</span> my-project
$ <span class="token function">npm</span> <span class="token function">install</span>
</code></pre></div><p><strong>yarn</strong></p><div class="language-bash"><pre><code>$ <span class="token function">yarn</span> create minze my-project --template js
$ <span class="token builtin class-name">cd</span> my-project
$ <span class="token function">yarn</span> <span class="token function">install</span>
</code></pre></div><p><strong>pnpm</strong></p><div class="language-bash"><pre><code>$ <span class="token function">pnpm</span> create minze my-project -- --template js
$ <span class="token builtin class-name">cd</span> my-project
$ <span class="token function">pnpm</span> <span class="token function">install</span>
</code></pre></div><h2 id="creating-a-component" tabindex="-1">Creating a component <a class="header-anchor" href="#creating-a-component" aria-hidden="true">#</a></h2><ol><li>In the root directory of your project start the development server and open the <code>http://localhost:3000</code> URL.</li></ol><div class="language-bash"><pre><code><span class="token comment"># npm</span>
$ <span class="token function">npm</span> run dev

<span class="token comment"># yarn</span>
$ <span class="token function">yarn</span> dev

<span class="token comment"># pnpm</span>
$ <span class="token function">pnpm</span> run dev
</code></pre></div><ol start="2"><li>Navigate to the <code>lib</code> directory and create a new file.</li></ol><div class="language-"><pre><code>src/
\u2514\u2500 lib/
   \u251C\u2500 ...
   \u2514\u2500 my-element.js
</code></pre></div><ol start="3"><li>Paste the following code into the file.</li></ol><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> MinzeElement <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;minze&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">MyElement</span> <span class="token keyword">extends</span> <span class="token class-name">MinzeElement</span> <span class="token punctuation">{</span>
  <span class="token comment">// html template</span>
  <span class="token function-variable function">html</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;div&gt;My very own component!&lt;/div&gt;</span><span class="token template-punctuation string">\`</span></span>

  <span class="token comment">// scoped stylesheet</span>
  <span class="token function-variable function">css</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    div {
      background: rgb(55 245 220);
      padding: 1rem;
    }
  </span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span>
</code></pre></div><ol start="4"><li>Open the <code>module.js</code> and <code>template.js</code> files.</li></ol><div class="language-"><pre><code>src/
\u251C\u2500 ...
\u251C\u2500 module.js
\u2514\u2500 template.js
</code></pre></div><ol start="5"><li>Define an export for your component at the bottom of <code>module.js</code>.</li></ol><div class="language-js"><pre><code><span class="token comment">// ...</span>
<span class="token keyword">export</span> <span class="token operator">*</span> <span class="token keyword">from</span> <span class="token string">&#39;./lib/my-element&#39;</span>
</code></pre></div><ol start="5"><li>Add your component to the template inside <code>template.js</code>.</li></ol><div class="language-js"><pre><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  &lt;my-element&gt;&lt;/my-element&gt;
  &lt;minze-counter&gt;&lt;/minze-counter&gt;
</span><span class="token template-punctuation string">\`</span></span>
</code></pre></div><ol start="6"><li>Profit. Your component should be displayed in the browser.</li></ol><div class="tip custom-block"><p class="custom-block-title">Next steps:</p><ul><li>Learn how to <a href="/guide/publishing.html">publish and use</a> your components.</li><li>Learn how to use Minze with <a href="/guide/advanced-typescript.html">TypeScript</a>.</li></ul></div>`,29),p=[o];function l(r,c,i,d,m,u){return t(),e("div",null,p)}var g=n(s,[["render",l]]);export{h as __pageData,g as default};
