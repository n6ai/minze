import{_ as n,c as a,o as s,a as t}from"./app.9e2a54b3.js";const g='{"title":"Installation","description":"","frontmatter":{},"headers":[{"level":2,"title":"npm","slug":"npm"},{"level":2,"title":"CLI","slug":"cli"},{"level":3,"title":"Templates","slug":"templates"},{"level":3,"title":"Command line options","slug":"command-line-options"},{"level":2,"title":"CDN","slug":"cdn"}],"relativePath":"guide/installation.md"}',e={},p=t(`<h1 id="installation" tabindex="-1">Installation <a class="header-anchor" href="#installation" aria-hidden="true">#</a></h1><p>Minze can be installed in several different ways.</p><h2 id="npm" tabindex="-1">npm <a class="header-anchor" href="#npm" aria-hidden="true">#</a></h2><p>Installing from npm:</p><div class="language-bash"><pre><code><span class="token comment"># npm</span>
$ <span class="token function">npm</span> <span class="token function">install</span> minze

<span class="token comment"># yarn</span>
$ <span class="token function">yarn</span> <span class="token function">add</span> minze

<span class="token comment"># pnpm</span>
$ <span class="token function">pnpm</span> <span class="token function">add</span> minze
</code></pre></div><div class="language-js"><pre><code><span class="token keyword">import</span> Minze<span class="token punctuation">,</span> <span class="token punctuation">{</span> MinzeElement <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;minze&#39;</span>

<span class="token keyword">class</span> <span class="token class-name">MyElement</span> <span class="token keyword">extends</span> <span class="token class-name">MinzeElement</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">html</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Hello Minze!</span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span>

Minze<span class="token punctuation">.</span><span class="token function">defineAll</span><span class="token punctuation">(</span><span class="token punctuation">[</span>MyElement<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre></div><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>my-element</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>my-element</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><h2 id="cli" tabindex="-1">CLI <a class="header-anchor" href="#cli" aria-hidden="true">#</a></h2><p>Installing via command line:</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>The CLI method scaffolds a Minze Dev and Publishing environment including <code>rollup</code> and <code>vite</code>.</p></div><blockquote><p>Minze requires <a href="https://nodejs.dev/" target="_blank" rel="noopener noreferrer">Node.js</a> version &gt;= <code>16.0.0</code></p></blockquote><p><strong>npm</strong></p><div class="language-bash"><pre><code><span class="token comment"># npm</span>
$ <span class="token function">npm</span> init minze@latest

<span class="token comment"># yarn</span>
$ <span class="token function">yarn</span> create minze

<span class="token comment"># pnpm</span>
$ <span class="token function">pnpm</span> create minze
</code></pre></div><p>Then follow the prompts!</p><h3 id="templates" tabindex="-1">Templates <a class="header-anchor" href="#templates" aria-hidden="true">#</a></h3><p>There are currently the following templates available:</p><ul><li>JavaScript - <code>js</code></li><li>TypeScript - <code>ts</code></li></ul><blockquote><p>The shorthand can be used in command line options, e.g. <code>--template ts</code></p></blockquote><h3 id="command-line-options" tabindex="-1">Command line options <a class="header-anchor" href="#command-line-options" aria-hidden="true">#</a></h3><p>You can directly specify the project name and template via additional command line options. For example, to scaffold a TypeScript environment, run:</p><div class="language-bash"><pre><code><span class="token comment"># npm</span>
$ <span class="token function">npm</span> init minze@latest my-project -- --template ts

<span class="token comment"># yarn</span>
$ <span class="token function">yarn</span> create minze my-project --template ts

<span class="token comment"># pnpm</span>
$ <span class="token function">pnpm</span> create minze my-project -- --template ts
</code></pre></div><h2 id="cdn" tabindex="-1">CDN <a class="header-anchor" href="#cdn" aria-hidden="true">#</a></h2><p>Loading Minze via a CDN link from <code>unpkg</code> or <code>jsdelivr</code>. Pick one of the following:</p><p><strong>unpkg</strong></p><ul><li><code>//unpkg.com/minze@latest</code> for latest version</li><li><code>//unpkg.com/minze@1.0.0</code> pin to specific version</li></ul><p><strong>jsdelivr</strong></p><ul><li><code>//cdn.jsdelivr.net/npm/minze@latest</code> for latest version</li><li><code>//cdn.jsdelivr.net/npm/minze@1.0.0</code> pin to specific version</li></ul><p><strong>Example</strong></p><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- custom component --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>my-element</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>my-element</span><span class="token punctuation">&gt;</span></span>

    <span class="token comment">&lt;!-- minze --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>//unpkg.com/minze@latest<span class="token punctuation">&quot;</span></span> <span class="token attr-name">defer</span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

    <span class="token comment">&lt;!-- custom component definition --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>module<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
      <span class="token keyword">class</span> <span class="token class-name">MyElement</span> <span class="token keyword">extends</span> <span class="token class-name">MinzeElement</span> <span class="token punctuation">{</span>
        <span class="token function-variable function">html</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Hello Minze!</span><span class="token template-punctuation string">\`</span></span>
      <span class="token punctuation">}</span>

      Minze<span class="token punctuation">.</span><span class="token function">defineAll</span><span class="token punctuation">(</span><span class="token punctuation">[</span>MyElement<span class="token punctuation">]</span><span class="token punctuation">)</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>
</code></pre></div>`,29),o=[p];function c(l,i,u,r,k,m){return s(),a("div",null,o)}var h=n(e,[["render",c]]);export{g as __pageData,h as default};
