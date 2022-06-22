import{_ as n,c as s,o as a,a as t}from"./app.9e2a54b3.js";const h='{"title":"Style Guide","description":"","frontmatter":{},"headers":[{"level":2,"title":"Component Names","slug":"component-names"},{"level":2,"title":"Component File Names","slug":"component-file-names"},{"level":2,"title":"Number of Components","slug":"number-of-components"},{"level":2,"title":"Property and Method Names","slug":"property-and-method-names"},{"level":2,"title":"Conditional Render Methods","slug":"conditional-render-methods"},{"level":2,"title":"Event Callbacks","slug":"event-callbacks"},{"level":2,"title":"Component Structure","slug":"component-structure"}],"relativePath":"guide/advanced-style-guide.md"}',e={},p=t(`<h1 id="style-guide" tabindex="-1">Style Guide <a class="header-anchor" href="#style-guide" aria-hidden="true">#</a></h1><p>By following this Style Guide you will be able to write better code and have a better developer experience when working with Minze.</p><h2 id="component-names" tabindex="-1">Component Names <a class="header-anchor" href="#component-names" aria-hidden="true">#</a></h2><ul><li>Should always consist of at least two words.</li><li>Should be defined in <code>PascalCase</code>.</li><li>Shouldn&#39;t start with the <code>Minze</code> prefix unless they are part of one of the core <code>minze</code> packages.</li><li>Should start with a unique prefix like your company name.</li></ul><div class="language-js"><pre><code><span class="token comment">// \u2716 Bad</span>
<span class="token keyword">class</span> <span class="token class-name">Text</span> <span class="token keyword">extends</span> <span class="token class-name">MinzeElement</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">my_component</span> <span class="token keyword">extends</span> <span class="token class-name">MinzeElement</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">MinzeComponent</span> <span class="token keyword">extends</span> <span class="token class-name">MinzeElement</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token comment">// \u2714 Good</span>
<span class="token keyword">class</span> <span class="token class-name">UniqueName</span> <span class="token keyword">extends</span> <span class="token class-name">MinzeElement</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">UniqueButton</span> <span class="token keyword">extends</span> <span class="token class-name">MinzeElement</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre></div><h2 id="component-file-names" tabindex="-1">Component File Names <a class="header-anchor" href="#component-file-names" aria-hidden="true">#</a></h2><ul><li>Should be named consistently in either <code>dash-case</code> or <code>PascalCase</code>.</li><li>Should be named after the component they are exporting.</li></ul><div class="language-"><pre><code>// \u2716 Bad
my_unique_name.js
my_Unique-name.js
myuniquename.js
MYUNIQUENAME.js

// \u2714 Good
my-unique-name.js
my-unique-name-two.js

// \u2714 Good
MyUniqueName.js
MyUniqueNameTwo.js
</code></pre></div><h2 id="number-of-components" tabindex="-1">Number of Components <a class="header-anchor" href="#number-of-components" aria-hidden="true">#</a></h2><ul><li>Create only one component per file. Otherwise, the file may become too big and hard to maintain.</li></ul><div class="language-js"><pre><code><span class="token comment">// \u2716 Bad</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">MyElement</span> <span class="token keyword">extends</span> <span class="token class-name">MinzeElement</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">MySecondElement</span> <span class="token keyword">extends</span> <span class="token class-name">MinzeElement</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token comment">// \u2714 Good</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">MyElement</span> <span class="token keyword">extends</span> <span class="token class-name">MinzeElement</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre></div><h2 id="property-and-method-names" tabindex="-1">Property and Method Names <a class="header-anchor" href="#property-and-method-names" aria-hidden="true">#</a></h2><ul><li>Attributes defined in the <code>attrs</code> or <code>observedAttributes</code> should always be named in <code>dash-case</code>.</li><li>All other properties and methods should be named in <code>camelCase</code>.</li></ul><div class="language-js"><pre><code><span class="token comment">// \u2716 Bad</span>
<span class="token keyword">class</span> <span class="token class-name">MyElement</span> <span class="token keyword">extends</span> <span class="token class-name">MinzeElement</span> <span class="token punctuation">{</span>
  reactive <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token string">&#39;my-propery&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;value&#39;</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
  attrs <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;myAttribute&#39;</span><span class="token punctuation">]</span>
  <span class="token constant">MYPROPERTY</span> <span class="token operator">=</span> <span class="token string">&#39;value&#39;</span>
  <span class="token function">my_method</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u2714 Good</span>
<span class="token keyword">class</span> <span class="token class-name">MyElement</span> <span class="token keyword">extends</span> <span class="token class-name">MinzeElement</span> <span class="token punctuation">{</span>
  reactive <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token string">&#39;myPropery&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;value&#39;</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
  attrs <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;my-attribute&#39;</span><span class="token punctuation">]</span>
  myProperty <span class="token operator">=</span> <span class="token string">&#39;value&#39;</span>
  <span class="token function">myMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="conditional-render-methods" tabindex="-1">Conditional Render Methods <a class="header-anchor" href="#conditional-render-methods" aria-hidden="true">#</a></h2><ul><li>Should start with the word <code>when</code>.</li></ul><div class="language-js"><pre><code><span class="token comment">// \u2716 Bad</span>
<span class="token keyword">class</span> <span class="token class-name">MyElement</span> <span class="token keyword">extends</span> <span class="token class-name">MinzeElement</span> <span class="token punctuation">{</span>
  active <span class="token operator">=</span> <span class="token boolean">true</span>

  <span class="token function">renderDiv</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>active<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;div&gt;Hello Minze!&lt;/div&gt;</span><span class="token template-punctuation string">\`</span></span>
    <span class="token keyword">else</span> <span class="token keyword">return</span> <span class="token string">&#39;&#39;</span>
  <span class="token punctuation">}</span>

  <span class="token function-variable function">html</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">renderDiv</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span>

<span class="token comment">// \u2714 Good</span>
<span class="token keyword">class</span> <span class="token class-name">MyElement</span> <span class="token keyword">extends</span> <span class="token class-name">MinzeElement</span> <span class="token punctuation">{</span>
  active <span class="token operator">=</span> <span class="token boolean">true</span>

  <span class="token function">whenActive</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>active<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;div&gt;Hello Minze!&lt;/div&gt;</span><span class="token template-punctuation string">\`</span></span>
    <span class="token keyword">else</span> <span class="token keyword">return</span> <span class="token string">&#39;&#39;</span>
  <span class="token punctuation">}</span>

  <span class="token function-variable function">html</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">whenActive</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="event-callbacks" tabindex="-1">Event Callbacks <a class="header-anchor" href="#event-callbacks" aria-hidden="true">#</a></h2><ul><li>Use arrow functions when defining callbacks. They are automatically bound to the component.</li><li>Should start with the word <code>handle</code> or a verb that describes what action is performed.</li></ul><div class="language-js"><pre><code><span class="token comment">// \u2716 Bad</span>
<span class="token keyword">class</span> <span class="token class-name">MyElement</span> <span class="token keyword">extends</span> <span class="token class-name">MinzeElement</span> <span class="token punctuation">{</span>
  <span class="token function">buttonCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Clicked!&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  eventListeners <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token string">&#39;.button&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">buttonCallback</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u2714 Good</span>
<span class="token keyword">class</span> <span class="token class-name">MyElement</span> <span class="token keyword">extends</span> <span class="token class-name">MinzeElement</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">handleClick</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Clicked!&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  eventListeners <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token string">&#39;.button&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>handleClick<span class="token punctuation">]</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u2714 Good</span>
<span class="token keyword">class</span> <span class="token class-name">MyElement</span> <span class="token keyword">extends</span> <span class="token class-name">MinzeElement</span> <span class="token punctuation">{</span>
  reactive <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token string">&#39;count&#39;</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">]</span>

  <span class="token function-variable function">increaseCount</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>count<span class="token operator">++</span>
  <span class="token punctuation">}</span>

  eventListeners <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token string">&#39;.button&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>increaseCount<span class="token punctuation">]</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="component-structure" tabindex="-1">Component Structure <a class="header-anchor" href="#component-structure" aria-hidden="true">#</a></h2><ul><li>The structure isn&#39;t set in stone, but by following the below example you will have a well-structured component that is easy to maintain.</li><li>The structure should be as follows: <ol><li>Properties (Data)</li><li>Methods</li><li>Watchers</li><li>Templates</li><li>Hooks</li><li>Callbacks</li><li>Event Listeners</li></ol></li></ul><p><strong>Example</strong></p><div class="language-ts"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> MinzeElement <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;minze&#39;</span>

<span class="token comment">// interface (only applicable for TypeScript)</span>
<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">MyElement</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>

<span class="token comment">// custom component</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">MyElement</span> <span class="token keyword">extends</span> <span class="token class-name">MinzeElement</span> <span class="token punctuation">{</span>
  <span class="token comment">// reactive properties</span>
  reactive <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token string">&#39;count&#39;</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">]</span>

  <span class="token comment">// reactive attributes</span>
  attrs <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;text&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;bg-color&#39;</span><span class="token punctuation">]</span>

  <span class="token comment">// observed attributes</span>
  <span class="token keyword">static</span> observedAttributes <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;text&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;bg-color&#39;</span><span class="token punctuation">]</span>

  <span class="token comment">// non-reactive properties</span>
  amount <span class="token operator">=</span> <span class="token number">0</span>

  <span class="token comment">// methods</span>
  <span class="token function-variable function">increaseCount</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>count<span class="token operator">++</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// watchers</span>
  watch <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token string">&#39;count&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">]</span>

  <span class="token comment">// html template</span>
  <span class="token function-variable function">html</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    &lt;slot&gt;&lt;/slot&gt;
  </span><span class="token template-punctuation string">\`</span></span>

  <span class="token comment">// css template</span>
  <span class="token function-variable function">css</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    :host {
      display: block;
    }
  </span><span class="token template-punctuation string">\`</span></span>

  <span class="token comment">// hooks</span>
  <span class="token function-variable function">onStart</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;onStart&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token function-variable function">onReady</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;onReady&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// callbacks</span>
  <span class="token function-variable function">handleClick</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;clicked&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// event listeners</span>
  eventListeners <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token string">&#39;.button&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>handleClick<span class="token punctuation">]</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div>`,24),o=[p];function c(l,i,u,k,r,d){return a(),s("div",null,o)}var y=n(e,[["render",c]]);export{h as __pageData,y as default};
