import{_ as n,c as s,o as a,a as t}from"./app.9e2a54b3.js";const m='{"title":"Templating","description":"","frontmatter":{},"headers":[{"level":2,"title":"HTML","slug":"html"},{"level":3,"title":"Slots","slug":"slots"},{"level":2,"title":"Rendering","slug":"rendering"},{"level":3,"title":"Conditional Rendering","slug":"conditional-rendering"},{"level":3,"title":"Conditional Attributes","slug":"conditional-attributes"},{"level":3,"title":"List Rendering","slug":"list-rendering"},{"level":3,"title":"Destructuring","slug":"destructuring"},{"level":3,"title":"Loading Indicators","slug":"loading-indicators"},{"level":3,"title":"Cloaking","slug":"cloaking"},{"level":2,"title":"Patching","slug":"patching"}],"relativePath":"guide/components-templating.md"}',p={},e=t(`<h1 id="templating" tabindex="-1">Templating <a class="header-anchor" href="#templating" aria-hidden="true">#</a></h1><p>By default, templating is done through <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals" target="_blank" rel="noopener noreferrer">template literals</a>. The <code>html</code> property expects a function with a return value of type <code>string</code>.</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>There is a private property called <code>template</code> that combines the defined <code>html</code> and <code>css</code> properties into one. The final result is what&#39;s being rendered.</p></div><h2 id="html" tabindex="-1">HTML <a class="header-anchor" href="#html" aria-hidden="true">#</a></h2><p>The <code>html</code> property defines the <code>html</code> template of the component. If no <code>html</code> property is defined on the component it defaults to <code>&lt;slot&gt;&lt;/slot&gt;</code>.</p><p><strong>Example</strong></p><div class="language-js"><pre><code><span class="token keyword">import</span> Minze<span class="token punctuation">,</span> <span class="token punctuation">{</span> MinzeElement <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;minze&#39;</span>

<span class="token keyword">class</span> <span class="token class-name">MyElement</span> <span class="token keyword">extends</span> <span class="token class-name">MinzeElement</span> <span class="token punctuation">{</span>
  myText <span class="token operator">=</span> <span class="token string">&#39;Hello Minze!&#39;</span>

  <span class="token function-variable function">html</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    &lt;div&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>myText<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/div&gt;
  </span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span>

Minze<span class="token punctuation">.</span><span class="token function">defineAll</span><span class="token punctuation">(</span><span class="token punctuation">[</span>MyElement<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre></div><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>my-element</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>my-element</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p><strong>Example</strong></p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>You can get started without even declaring any properties, it&#39;s still a valid component.</p></div><div class="language-js"><pre><code><span class="token keyword">import</span> Minze<span class="token punctuation">,</span> <span class="token punctuation">{</span> MinzeElement <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;minze&#39;</span>

<span class="token keyword">class</span> <span class="token class-name">MyElement</span> <span class="token keyword">extends</span> <span class="token class-name">MinzeElement</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

Minze<span class="token punctuation">.</span><span class="token function">defineAll</span><span class="token punctuation">(</span><span class="token punctuation">[</span>MyElement<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre></div><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>my-element</span><span class="token punctuation">&gt;</span></span>Hello Minze!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>my-element</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><h3 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-hidden="true">#</a></h3><p>Slots are a way to add elements from the outside world to the element. There are two types of slots:</p><ul><li><strong>default slots</strong> - only one slot per component can be the default slot.</li><li><strong>named slots</strong> - as many as you like.</li></ul><p><strong>Example</strong></p><div class="language-js"><pre><code><span class="token keyword">import</span> Minze<span class="token punctuation">,</span> <span class="token punctuation">{</span> MinzeElement <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;minze&#39;</span>

<span class="token keyword">class</span> <span class="token class-name">MyElement</span> <span class="token keyword">extends</span> <span class="token class-name">MinzeElement</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">html</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    &lt;slot&gt;&lt;/slot&gt;
    &lt;slot name=&quot;my-slot&quot;&gt;&lt;/slot&gt;
  </span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span>

Minze<span class="token punctuation">.</span><span class="token function">defineAll</span><span class="token punctuation">(</span><span class="token punctuation">[</span>MyElement<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre></div><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>my-element</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>Hello Minze!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">slot</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>my-slot<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Hello Minze again!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>my-element</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><h2 id="rendering" tabindex="-1">Rendering <a class="header-anchor" href="#rendering" aria-hidden="true">#</a></h2><p>Some advanced techniques can be used in <code>html</code> and <code>css</code> templates.</p><h3 id="conditional-rendering" tabindex="-1">Conditional Rendering <a class="header-anchor" href="#conditional-rendering" aria-hidden="true">#</a></h3><p>If you want to render a part of the template based on a specific condition, you can use the <code>ternary</code> operator, or define the logic in a separate method.</p><p><strong>Example</strong></p><div class="language-js"><pre><code><span class="token keyword">import</span> Minze<span class="token punctuation">,</span> <span class="token punctuation">{</span> MinzeElement <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;minze&#39;</span>

<span class="token keyword">class</span> <span class="token class-name">MyElement</span> <span class="token keyword">extends</span> <span class="token class-name">MinzeElement</span> <span class="token punctuation">{</span>
  isVisible <span class="token operator">=</span> <span class="token boolean">true</span>

  <span class="token function-variable function">whenVisible</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>isVisible<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;div&gt;Hello Minze!&lt;/div&gt;</span><span class="token template-punctuation string">\`</span></span>
    <span class="token keyword">else</span> <span class="token keyword">return</span> <span class="token string">&#39;&#39;</span>
  <span class="token punctuation">}</span>

  <span class="token function-variable function">html</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>isVisible <span class="token operator">?</span> <span class="token string">&#39;&lt;div&gt;Hello Minze!&lt;/div&gt;&#39;</span> <span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
    </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">whenVisible</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
  </span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span>

Minze<span class="token punctuation">.</span><span class="token function">defineAll</span><span class="token punctuation">(</span><span class="token punctuation">[</span>MyElement<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre></div><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>my-element</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>my-element</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><h3 id="conditional-attributes" tabindex="-1">Conditional Attributes <a class="header-anchor" href="#conditional-attributes" aria-hidden="true">#</a></h3><p>Conditional rendering can also be used for attributes.</p><p><strong>Example</strong></p><div class="language-js"><pre><code><span class="token keyword">import</span> Minze<span class="token punctuation">,</span> <span class="token punctuation">{</span> MinzeElement <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;minze&#39;</span>

<span class="token keyword">class</span> <span class="token class-name">MyElement</span> <span class="token keyword">extends</span> <span class="token class-name">MinzeElement</span> <span class="token punctuation">{</span>
  isActive <span class="token operator">=</span> <span class="token boolean">true</span>

  <span class="token function-variable function">html</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    &lt;div </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>isActive <span class="token operator">?</span> <span class="token string">&#39;class=&quot;active&quot;&#39;</span> <span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&gt;
      Hello Minze!
    &lt;/div&gt;
  </span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span>

Minze<span class="token punctuation">.</span><span class="token function">defineAll</span><span class="token punctuation">(</span><span class="token punctuation">[</span>MyElement<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre></div><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>my-element</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>my-element</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><h3 id="list-rendering" tabindex="-1">List Rendering <a class="header-anchor" href="#list-rendering" aria-hidden="true">#</a></h3><p>To render a list in a template literal you can use the <code>map</code> method in cobination with <code>join</code>.</p><p><strong>Example</strong></p><div class="language-js"><pre><code><span class="token keyword">import</span> Minze<span class="token punctuation">,</span> <span class="token punctuation">{</span> MinzeElement <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;minze&#39;</span>

<span class="token keyword">class</span> <span class="token class-name">MyElement</span> <span class="token keyword">extends</span> <span class="token class-name">MinzeElement</span> <span class="token punctuation">{</span>
  myList <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span>

  <span class="token function-variable function">html</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    &lt;ul&gt;
      </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>myList<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;li&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>item<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/li&gt;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
    &lt;/ul&gt;
  </span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span>

Minze<span class="token punctuation">.</span><span class="token function">defineAll</span><span class="token punctuation">(</span><span class="token punctuation">[</span>MyElement<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre></div><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>my-element</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>my-element</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><h3 id="destructuring" tabindex="-1">Destructuring <a class="header-anchor" href="#destructuring" aria-hidden="true">#</a></h3><p>You can destructure the properties and methods of a component to avoid writing <code>this</code> over and over again. Simply pass them as an argument to the template.</p><p><strong>Example</strong></p><div class="language-js"><pre><code><span class="token keyword">import</span> Minze<span class="token punctuation">,</span> <span class="token punctuation">{</span> MinzeElement <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;minze&#39;</span>

<span class="token keyword">class</span> <span class="token class-name">MyElement</span> <span class="token keyword">extends</span> <span class="token class-name">MinzeElement</span> <span class="token punctuation">{</span>
  someValue <span class="token operator">=</span> <span class="token string">&#39;Hello Minze!&#39;</span>

  <span class="token function-variable function">html</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> someValue <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    &lt;div&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>someValue<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/div&gt;
  </span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span>

Minze<span class="token punctuation">.</span><span class="token function">defineAll</span><span class="token punctuation">(</span><span class="token punctuation">[</span>MyElement<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre></div><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>my-element</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>my-element</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><h3 id="loading-indicators" tabindex="-1">Loading Indicators <a class="header-anchor" href="#loading-indicators" aria-hidden="true">#</a></h3><p>If you are fetching some data from an external API you can use a loading indicator to display a loading state. In the example below the template is automatically rerendered after the reactive data property is reassigned.</p><p><strong>Example</strong></p><div class="language-js"><pre><code><span class="token keyword">import</span> Minze<span class="token punctuation">,</span> <span class="token punctuation">{</span> MinzeElement <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;minze&#39;</span>

<span class="token keyword">class</span> <span class="token class-name">MyElement</span> <span class="token keyword">extends</span> <span class="token class-name">MinzeElement</span> <span class="token punctuation">{</span>
  reactive <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token string">&#39;data&#39;</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">]</span><span class="token punctuation">]</span>

  <span class="token function-variable function">html</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>data <span class="token operator">?</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;div&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>data<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/div&gt;</span><span class="token template-punctuation string">\`</span></span> <span class="token operator">:</span> <span class="token string">&#39;&lt;div class=&quot;loading&quot;&gt;&lt;/div&gt;&#39;</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
  </span><span class="token template-punctuation string">\`</span></span>

  <span class="token function-variable function">css</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    .loading {
      width: 1rem;
      height: 1rem;
      background: rgb(55 245 220);
      animation: loading 1s infinite;
    }

    @keyframes loading {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </span><span class="token template-punctuation string">\`</span></span>

  <span class="token keyword">async</span> <span class="token function">onReactive</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> delay <span class="token operator">=</span> <span class="token number">2000</span> <span class="token comment">// ms</span>
    <span class="token keyword">await</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> delay<span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span>data <span class="token operator">=</span> <span class="token string">&#39;Hello Minze!&#39;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">simulated response time: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>delay<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

Minze<span class="token punctuation">.</span><span class="token function">defineAll</span><span class="token punctuation">(</span><span class="token punctuation">[</span>MyElement<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre></div><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>my-element</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>my-element</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><h3 id="cloaking" tabindex="-1">Cloaking <a class="header-anchor" href="#cloaking" aria-hidden="true">#</a></h3><p>Cloaking is the process of hiding elements from the user until they are defined. You can hide all custom web components until they are defined with the following <code>CSS</code> selector:</p><div class="language-css"><pre><code><span class="token selector">:not(:defined)</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="patching" tabindex="-1">Patching <a class="header-anchor" href="#patching" aria-hidden="true">#</a></h2><p>Under the hood, Minze uses a concept called <code>patching</code>. It always tries to gracefully patch in and out all attributes and text before hard rerendering parts of, or the whole template. It achieves this by comparing the new template to the current one and changing only what&#39;s needed. Patching only works if the number of elements plus their types and amount of text nodes stay the same during reactive changes.</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Patching is not necessary for every component, sometimes a hard rerender can be a better choice.</p></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>If you want to take advantage of patching, your templates should always return the exact same amount of elements and text nodes between different states.</p></div><p><strong>Example</strong></p><div class="language-js"><pre><code><span class="token keyword">import</span> Minze<span class="token punctuation">,</span> <span class="token punctuation">{</span> MinzeElement <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;minze&#39;</span>

<span class="token keyword">class</span> <span class="token class-name">MyElement</span> <span class="token keyword">extends</span> <span class="token class-name">MinzeElement</span> <span class="token punctuation">{</span>
  reactive <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token string">&#39;active&#39;</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">]</span><span class="token punctuation">]</span>

  <span class="token function-variable function">html</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    &lt;button&gt;
      Toggle state
    &lt;/button&gt;

    &lt;!-- div is patched --&gt;
    &lt;div&gt;
      &lt;div&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>active<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/div&gt;
    &lt;/div&gt;

    &lt;!-- div is patched --&gt;
    &lt;div&gt;
      &lt;div&gt;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>active <span class="token operator">?</span> <span class="token string">&#39;true&#39;</span> <span class="token operator">:</span> <span class="token string">&#39;false&#39;</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/div&gt;
    &lt;/div&gt;

    &lt;!-- div is patched --&gt;
    &lt;div&gt;
      </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>active <span class="token operator">?</span> <span class="token string">&#39;&lt;div&gt;true&lt;/div&gt;&#39;</span> <span class="token operator">:</span> <span class="token string">&#39;&lt;div&gt;false&lt;/div&gt;&#39;</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
    &lt;/div&gt;

    &lt;!-- div isn&#39;t patched, but rerendered --&gt;
    &lt;div&gt;
      </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>active <span class="token operator">?</span> <span class="token string">&#39;&lt;div&gt;true&lt;/div&gt;&#39;</span> <span class="token operator">:</span> <span class="token string">&#39;false&#39;</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
    &lt;/div&gt;

    &lt;!-- div isn&#39;t patched, but rerendered --&gt;
    &lt;div&gt;
      </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>active <span class="token operator">?</span> <span class="token string">&#39;&lt;div&gt;true&lt;/div&gt;&#39;</span> <span class="token operator">:</span> <span class="token string">&#39;&lt;span&gt;false&lt;/span&gt;&#39;</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
    &lt;/div&gt;

    &lt;!-- div isn&#39;t patched, but rerendered --&gt;
    &lt;div&gt;
      </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>active <span class="token operator">?</span> <span class="token string">&#39;&lt;div&gt;true&lt;/div&gt; &lt;div&gt;&amp;nbsp;&lt;/div&gt;&#39;</span> <span class="token operator">:</span> <span class="token string">&#39;&lt;div&gt;false&lt;/div&gt;&#39;</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
    &lt;/div&gt;
  </span><span class="token template-punctuation string">\`</span></span>

  <span class="token function-variable function">handleClick</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>active <span class="token operator">=</span> <span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>active
  <span class="token punctuation">}</span>

  eventListeners <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token string">&#39;button&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>handleClick<span class="token punctuation">]</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

Minze<span class="token punctuation">.</span><span class="token function">defineAll</span><span class="token punctuation">(</span><span class="token punctuation">[</span>MyElement<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre></div><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>my-element</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>my-element</span><span class="token punctuation">&gt;</span></span>
</code></pre></div>`,55),o=[e];function c(l,i,u,r,k,d){return a(),s("div",null,o)}var h=n(p,[["render",c]]);export{m as __pageData,h as default};
