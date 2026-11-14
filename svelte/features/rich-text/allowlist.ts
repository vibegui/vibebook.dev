// Baseline: DOMPurify 3.1.6 tag sets plus the host's MD_PURIFY exclusions.
// These are data allowlists, never names supplied directly to a dynamic element.
export const HTML_TAGS = new Set(
  "a abbr acronym address area article aside audio b bdi bdo big blink blockquote body br canvas caption center cite code col colgroup content data datalist dd decorator del details dfn dialog dir div dl dt element em fieldset figcaption figure font footer h1 h2 h3 h4 h5 h6 head header hgroup hr html i ins kbd label legend li main map mark marquee menu menuitem meter nav nobr ol optgroup option output p picture pre progress q rp rt ruby s samp section shadow small source spacer span strike strong sub summary sup table tbody td tfoot th thead time track tt u ul var video wbr".split(
    " ",
  ),
);
export const SVG_TAGS = new Set(
  "svg a altglyph altglyphdef altglyphitem animatecolor animatemotion animatetransform circle clippath defs desc ellipse filter font g glyph glyphref hkern image line lineargradient marker mask metadata mpath path pattern polygon polyline radialgradient rect stop switch symbol text textpath title tref tspan view vkern feblend fecolormatrix fecomponenttransfer fecomposite feconvolvematrix fediffuselighting fedisplacementmap fedistantlight fedropshadow feflood fefunca fefuncb fefuncg fefuncr fegaussianblur feimage femerge femergenode femorphology feoffset fepointlight fespecularlighting fespotlight fetile feturbulence".split(
    " ",
  ),
);
export const MATH_TAGS = new Set(
  "math menclose merror mfenced mfrac mglyph mi mlabeledtr mmultiscripts mn mo mover mpadded mphantom mroot mrow ms mspace msqrt mstyle msub msup msubsup mtable mtd mtext mtr munder munderover mprescripts".split(
    " ",
  ),
);
// Disallowed wrappers otherwise retain harmless child text, as KEEP_CONTENT does.
export const DROP_CONTENTS = new Set(
  "script style iframe object embed template noscript noembed noframes plaintext xmp foreignobject annotation-xml".split(
    " ",
  ),
);
export const HTML_NS = "http://www.w3.org/1999/xhtml";
export const SVG_NS = "http://www.w3.org/2000/svg";
export const MATH_NS = "http://www.w3.org/1998/Math/MathML";
export const HTML_ATTRIBUTES = new Set(
  "accept action align alt autocapitalize autocomplete autopictureinpicture autoplay background bgcolor border capture cellpadding cellspacing checked cite class clear color cols colspan controls controlslist coords crossorigin datetime decoding default dir disabled disablepictureinpicture disableremoteplayback download draggable enctype enterkeyhint face for headers height hidden high href hreflang id inputmode integrity ismap kind label lang list loading loop low max maxlength media method min minlength multiple muted name nonce noshade novalidate nowrap open optimum pattern placeholder playsinline popover popovertarget popovertargetaction poster preload pubdate radiogroup readonly rel required rev reversed role rows rowspan spellcheck scope selected shape size sizes span srclang start src srcset step style summary tabindex title translate type usemap valign value width wrap xmlns slot".split(
    " ",
  ),
);
export const SVG_ATTRIBUTES = new Set(
  "accent-height accumulate additive alignment-baseline ascent attributename attributetype azimuth basefrequency baseline-shift begin bias by class clip clippathunits clip-path clip-rule color color-interpolation color-interpolation-filters color-profile color-rendering cx cy d dx dy diffuseconstant direction display divisor dur edgemode elevation end fill fill-opacity fill-rule filter filterunits flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight fx fy g1 g2 glyph-name glyphref gradientunits gradienttransform height href id image-rendering in in2 k k1 k2 k3 k4 kerning keypoints keysplines keytimes lang lengthadjust letter-spacing kernelmatrix kernelunitlength lighting-color local marker-end marker-mid marker-start markerheight markerunits markerwidth maskcontentunits maskunits max mask media method mode min name numoctaves offset operator opacity order orient orientation origin overflow paint-order path pathlength patterncontentunits patterntransform patternunits points preservealpha preserveaspectratio primitiveunits r rx ry radius refx refy repeatcount repeatdur restart result rotate scale seed shape-rendering specularconstant specularexponent spreadmethod startoffset stddeviation stitchtiles stop-color stop-opacity stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke stroke-width style surfacescale systemlanguage tabindex targetx targety transform transform-origin text-anchor text-decoration text-rendering textlength type u1 u2 unicode values viewbox visibility version vert-adv-y vert-origin-x vert-origin-y width word-spacing wrap writing-mode xchannelselector ychannelselector x x1 x2 xmlns y y1 y2 z zoomandpan".split(
    " ",
  ),
);
export const MATH_ATTRIBUTES = new Set(
  "accent accentunder align bevelled close columnsalign columnlines columnspan denomalign depth dir display displaystyle encoding fence frame height href id largeop length linethickness lspace lquote mathbackground mathcolor mathsize mathvariant maxsize minsize movablelimits notation numalign open rowalign rowlines rowspacing rowspan rspace rquote scriptlevel scriptminsize scriptsizemultiplier selection separator separators stretchy subscriptshift supscriptshift symmetric voffset width xmlns".split(
    " ",
  ),
);
export const BOOLEAN_ATTRIBUTES = new Set(
  "open hidden reversed controls loop muted autoplay playsinline default".split(
    " ",
  ),
);
export const REFERENCE_ATTRIBUTES = new Set(
  "clip-path filter mask marker-start marker-mid marker-end".split(" "),
);
