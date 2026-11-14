// node_modules/parse5/dist/common/unicode.js
var e = /* @__PURE__ */ new Set([
	65534,
	65535,
	131070,
	131071,
	196606,
	196607,
	262142,
	262143,
	327678,
	327679,
	393214,
	393215,
	458750,
	458751,
	524286,
	524287,
	589822,
	589823,
	655358,
	655359,
	720894,
	720895,
	786430,
	786431,
	851966,
	851967,
	917502,
	917503,
	983038,
	983039,
	1048574,
	1048575,
	1114110,
	1114111
]), t;
(function(e) {
	e[e.EOF = -1] = "EOF", e[e.NULL = 0] = "NULL", e[e.TABULATION = 9] = "TABULATION", e[e.CARRIAGE_RETURN = 13] = "CARRIAGE_RETURN", e[e.LINE_FEED = 10] = "LINE_FEED", e[e.FORM_FEED = 12] = "FORM_FEED", e[e.SPACE = 32] = "SPACE", e[e.EXCLAMATION_MARK = 33] = "EXCLAMATION_MARK", e[e.QUOTATION_MARK = 34] = "QUOTATION_MARK", e[e.AMPERSAND = 38] = "AMPERSAND", e[e.APOSTROPHE = 39] = "APOSTROPHE", e[e.HYPHEN_MINUS = 45] = "HYPHEN_MINUS", e[e.SOLIDUS = 47] = "SOLIDUS", e[e.DIGIT_0 = 48] = "DIGIT_0", e[e.DIGIT_9 = 57] = "DIGIT_9", e[e.SEMICOLON = 59] = "SEMICOLON", e[e.LESS_THAN_SIGN = 60] = "LESS_THAN_SIGN", e[e.EQUALS_SIGN = 61] = "EQUALS_SIGN", e[e.GREATER_THAN_SIGN = 62] = "GREATER_THAN_SIGN", e[e.QUESTION_MARK = 63] = "QUESTION_MARK", e[e.LATIN_CAPITAL_A = 65] = "LATIN_CAPITAL_A", e[e.LATIN_CAPITAL_Z = 90] = "LATIN_CAPITAL_Z", e[e.RIGHT_SQUARE_BRACKET = 93] = "RIGHT_SQUARE_BRACKET", e[e.GRAVE_ACCENT = 96] = "GRAVE_ACCENT", e[e.LATIN_SMALL_A = 97] = "LATIN_SMALL_A", e[e.LATIN_SMALL_Z = 122] = "LATIN_SMALL_Z";
})(t ||= {});
var n = {
	DASH_DASH: "--",
	CDATA_START: "[CDATA[",
	DOCTYPE: "doctype",
	SCRIPT: "script",
	PUBLIC: "public",
	SYSTEM: "system"
};
function r(e) {
	return e >= 55296 && e <= 57343;
}
function i(e) {
	return e >= 56320 && e <= 57343;
}
function a(e, t) {
	return (e - 55296) * 1024 + 9216 + t;
}
function o(e) {
	return e !== 32 && e !== 10 && e !== 13 && e !== 9 && e !== 12 && e >= 1 && e <= 31 || e >= 127 && e <= 159;
}
function s(t) {
	return t >= 64976 && t <= 65007 || e.has(t);
}
// node_modules/parse5/dist/common/error-codes.js
var c;
(function(e) {
	e.controlCharacterInInputStream = "control-character-in-input-stream", e.noncharacterInInputStream = "noncharacter-in-input-stream", e.surrogateInInputStream = "surrogate-in-input-stream", e.nonVoidHtmlElementStartTagWithTrailingSolidus = "non-void-html-element-start-tag-with-trailing-solidus", e.endTagWithAttributes = "end-tag-with-attributes", e.endTagWithTrailingSolidus = "end-tag-with-trailing-solidus", e.unexpectedSolidusInTag = "unexpected-solidus-in-tag", e.unexpectedNullCharacter = "unexpected-null-character", e.unexpectedQuestionMarkInsteadOfTagName = "unexpected-question-mark-instead-of-tag-name", e.invalidFirstCharacterOfTagName = "invalid-first-character-of-tag-name", e.unexpectedEqualsSignBeforeAttributeName = "unexpected-equals-sign-before-attribute-name", e.missingEndTagName = "missing-end-tag-name", e.unexpectedCharacterInAttributeName = "unexpected-character-in-attribute-name", e.unknownNamedCharacterReference = "unknown-named-character-reference", e.missingSemicolonAfterCharacterReference = "missing-semicolon-after-character-reference", e.unexpectedCharacterAfterDoctypeSystemIdentifier = "unexpected-character-after-doctype-system-identifier", e.unexpectedCharacterInUnquotedAttributeValue = "unexpected-character-in-unquoted-attribute-value", e.eofBeforeTagName = "eof-before-tag-name", e.eofInTag = "eof-in-tag", e.missingAttributeValue = "missing-attribute-value", e.missingWhitespaceBetweenAttributes = "missing-whitespace-between-attributes", e.missingWhitespaceAfterDoctypePublicKeyword = "missing-whitespace-after-doctype-public-keyword", e.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers = "missing-whitespace-between-doctype-public-and-system-identifiers", e.missingWhitespaceAfterDoctypeSystemKeyword = "missing-whitespace-after-doctype-system-keyword", e.missingQuoteBeforeDoctypePublicIdentifier = "missing-quote-before-doctype-public-identifier", e.missingQuoteBeforeDoctypeSystemIdentifier = "missing-quote-before-doctype-system-identifier", e.missingDoctypePublicIdentifier = "missing-doctype-public-identifier", e.missingDoctypeSystemIdentifier = "missing-doctype-system-identifier", e.abruptDoctypePublicIdentifier = "abrupt-doctype-public-identifier", e.abruptDoctypeSystemIdentifier = "abrupt-doctype-system-identifier", e.cdataInHtmlContent = "cdata-in-html-content", e.incorrectlyOpenedComment = "incorrectly-opened-comment", e.eofInScriptHtmlCommentLikeText = "eof-in-script-html-comment-like-text", e.eofInDoctype = "eof-in-doctype", e.nestedComment = "nested-comment", e.abruptClosingOfEmptyComment = "abrupt-closing-of-empty-comment", e.eofInComment = "eof-in-comment", e.incorrectlyClosedComment = "incorrectly-closed-comment", e.eofInCdata = "eof-in-cdata", e.absenceOfDigitsInNumericCharacterReference = "absence-of-digits-in-numeric-character-reference", e.nullCharacterReference = "null-character-reference", e.surrogateCharacterReference = "surrogate-character-reference", e.characterReferenceOutsideUnicodeRange = "character-reference-outside-unicode-range", e.controlCharacterReference = "control-character-reference", e.noncharacterCharacterReference = "noncharacter-character-reference", e.missingWhitespaceBeforeDoctypeName = "missing-whitespace-before-doctype-name", e.missingDoctypeName = "missing-doctype-name", e.invalidCharacterSequenceAfterDoctypeName = "invalid-character-sequence-after-doctype-name", e.duplicateAttribute = "duplicate-attribute", e.nonConformingDoctype = "non-conforming-doctype", e.missingDoctype = "missing-doctype", e.misplacedDoctype = "misplaced-doctype", e.endTagWithoutMatchingOpenElement = "end-tag-without-matching-open-element", e.closingOfElementWithOpenChildElements = "closing-of-element-with-open-child-elements", e.disallowedContentInNoscriptInHead = "disallowed-content-in-noscript-in-head", e.openElementsLeftAfterEof = "open-elements-left-after-eof", e.abandonedHeadElementChild = "abandoned-head-element-child", e.misplacedStartTagForHeadElement = "misplaced-start-tag-for-head-element", e.nestedNoscriptInHead = "nested-noscript-in-head", e.eofInElementThatCanContainOnlyText = "eof-in-element-that-can-contain-only-text";
})(c ||= {});
// node_modules/parse5/dist/tokenizer/preprocessor.js
var l = 65536, u = class {
	constructor(e) {
		this.handler = e, this.html = "", this.pos = -1, this.lastGapPos = -2, this.gapStack = [], this.skipNextNewLine = !1, this.lastChunkWritten = !1, this.endOfChunkHit = !1, this.bufferWaterline = l, this.isEol = !1, this.lineStartPos = 0, this.droppedBufferSize = 0, this.line = 1, this.lastErrOffset = -1;
	}
	get col() {
		return this.pos - this.lineStartPos + Number(this.lastGapPos !== this.pos);
	}
	get codePointStart() {
		return this.pos - Number(this.lastGapPos === this.pos);
	}
	get offset() {
		return this.droppedBufferSize + this.codePointStart;
	}
	getError(e, t) {
		let { line: n, col: r, offset: i } = this, a = r + t, o = i + t;
		return {
			code: e,
			startLine: n,
			endLine: n,
			startCol: a,
			endCol: a,
			startOffset: o,
			endOffset: o
		};
	}
	_err(e) {
		this.handler.onParseError && this.lastErrOffset !== this.offset && (this.lastErrOffset = this.offset, this.handler.onParseError(this.getError(e, 0)));
	}
	_addGap() {
		this.gapStack.push(this.lastGapPos), this.lastGapPos = this.pos;
	}
	_processSurrogate(e) {
		if (this.pos !== this.html.length - 1) {
			let t = this.html.charCodeAt(this.pos + 1);
			if (!i(e) && i(t)) return this.pos++, this._addGap(), a(e, t);
		} else if (!this.lastChunkWritten) return this.endOfChunkHit = !0, t.EOF;
		return this._err(c.surrogateInInputStream), e;
	}
	willDropParsedChunk() {
		return this.pos > this.bufferWaterline;
	}
	dropParsedChunk(e = 0) {
		if (this.willDropParsedChunk()) {
			let t = this.offset - this.droppedBufferSize - e;
			this.html = this.html.substring(t), this.lineStartPos -= t, this.droppedBufferSize += t, this.pos -= t, this.lastGapPos = -2, this.gapStack.length = 0, this.pos > e && this._addGap();
		}
	}
	write(e, t) {
		this.html.length > 0 ? this.html += e : this.html = e, this.endOfChunkHit = !1, this.lastChunkWritten = t;
	}
	insertHtmlAtCurrentPos(e) {
		this.html = this.html.substring(0, this.pos + 1) + e + this.html.substring(this.pos + 1), this.endOfChunkHit = !1;
	}
	startsWith(e, t) {
		if (this.pos + e.length > this.html.length) return this.endOfChunkHit = !this.lastChunkWritten, !1;
		if (t) return this.html.startsWith(e, this.pos);
		for (let t = 0; t < e.length; t++) if ((this.html.charCodeAt(this.pos + t) | 32) !== e.charCodeAt(t)) return !1;
		return !0;
	}
	peek(e) {
		let n = this.pos + e;
		if (n >= this.html.length) return this.endOfChunkHit = !this.lastChunkWritten, t.EOF;
		let r = this.html.charCodeAt(n);
		return r === t.CARRIAGE_RETURN ? t.LINE_FEED : r;
	}
	advance() {
		if (this.pos++, this.isEol && (this.isEol = !1, this.line++, this.lineStartPos = this.pos), this.pos >= this.html.length) return this.endOfChunkHit = !this.lastChunkWritten, t.EOF;
		let e = this.html.charCodeAt(this.pos);
		return e === t.CARRIAGE_RETURN ? (this.isEol = !0, this.skipNextNewLine = !0, t.LINE_FEED) : e === t.LINE_FEED && (this.isEol = !0, this.skipNextNewLine) ? (this.line--, this.skipNextNewLine = !1, this._addGap(), this.advance()) : (this.skipNextNewLine = !1, r(e) && (e = this._processSurrogate(e)), this.handler.onParseError === null || e > 31 && e < 127 || e === t.LINE_FEED || e === t.CARRIAGE_RETURN || e > 159 && e < 64976 || this._checkForProblematicCharacters(e), e);
	}
	_checkForProblematicCharacters(e) {
		o(e) ? this._err(c.controlCharacterInInputStream) : s(e) && this._err(c.noncharacterInInputStream);
	}
	retreat(e) {
		for (this.pos -= e; this.pos < this.lastGapPos;) this.lastGapPos = this.gapStack.pop(), this.pos--;
		this.isEol = !1;
	}
}, d;
(function(e) {
	e[e.CHARACTER = 0] = "CHARACTER", e[e.NULL_CHARACTER = 1] = "NULL_CHARACTER", e[e.WHITESPACE_CHARACTER = 2] = "WHITESPACE_CHARACTER", e[e.START_TAG = 3] = "START_TAG", e[e.END_TAG = 4] = "END_TAG", e[e.COMMENT = 5] = "COMMENT", e[e.DOCTYPE = 6] = "DOCTYPE", e[e.EOF = 7] = "EOF", e[e.HIBERNATION = 8] = "HIBERNATION";
})(d ||= {});
function f(e, t) {
	for (let n = e.attrs.length - 1; n >= 0; n--) if (e.attrs[n].name === t) return e.attrs[n].value;
	return null;
}
// node_modules/entities/dist/decode-codepoint.js
var ee = [
	8364,
	0,
	8218,
	402,
	8222,
	8230,
	8224,
	8225,
	710,
	8240,
	352,
	8249,
	338,
	0,
	381,
	0,
	0,
	8216,
	8217,
	8220,
	8221,
	8226,
	8211,
	8212,
	732,
	8482,
	353,
	8250,
	339,
	0,
	382,
	376
];
function p(e) {
	return e === 0 || e >= 55296 && e <= 57343 || e > 1114111;
}
function m(e) {
	return p(e) ? 65533 : e >= 128 && e <= 159 && ee[e - 128] || e;
}
function te(e) {
	return e - 1 >>> 0 < 127 || e - 160 >>> 0 < 55136 ? String.fromCharCode(e) : String.fromCodePoint(m(e));
}
// node_modules/entities/dist/generated/decode-data-html.js
var ne = ["Q=¨`p0AEligMPacutebrevecircyfrgravelphamacrndogonpfpplyFunctionringscrsigntildeumlBackslashrvwedcyecausernoullistafropfrevescrumpeqCHcyOPYacutepitalDifferentialDyleyscaronedilirconintdotedillanterDotfrhiircleDotMinusPlusTimeslockwiseContourIntegralseCurlyDoubleQuoteQuoteolonengruentinttourIntegralpfroductunterClockwiseContourIntegralrossscrupCapDDotrahdJcyScyZcyaggerrrshvcaronyeltafriacriticalAcuteDotubleAcuteGraveTildemondfferentialDopftDotEqualubleContourIntegralDotwnArrowLeftArrowRightArrowTeeongLeftArrowRightArrowRightArrowRightArrowTeeUpArrowDownArrowVerticalBarwnArrowBarUpArrowBreveLeftRightVectorTeeVectorVectorBarRightTeeVectorVectorBarTeeArrowarrowscrtrokENGTHacutecaronircydotfrgravelementmacrptySmallSquareVerySmallSquareogonpfpsilonqualTildeilibriumscrimtaumlxistsponentialEFcyfrilledSmallSquareVerySmallSquareopfrAlluriertrfscrGJcyTammadbrevecedilircydotfrgopfreaterEqualLessFullEqualGreaterLessSlantEqualTildescrtHARDcyacektcircfrilbertSpaceopfrizontalLinescrtrokumpDownHumpEqualIEcyJligOcyacutecircydotfrgravemacrginaryIpliesntegralrsectionvisibleCommaTimesogonpftascrtildeukcymlJcircyfropfscrercyukcyKHcyJcyappacedilyfropfscrLJcyTacutembdangplacetrfrrcaronedilyeftAngleBracketrrowBarRightArrowCeilingDoubleBracketwnTeeVectorVectorBarFloorRightArrowVectorTeeArrowVectorriangleBarEqualUpDownVectorTeeVectorVectorBarVectorBararrowrightarrowssEqualGreaterFullEqualGreaterLessSlantEqualTildefrleftarrowmidotongLeftArrowRightArrowRightArrowleftarrowrightarrowrightarrowpfwerLeftArrowRightArrowscrhtroktMapcyediumSpacellintrffrinusPlusopfscruNJcyacutecaronedilyegativeMediumSpaceThickSpacenSpaceVeryThinSpacestedGreaterGreaterLessLesswLinefroBreaknBreakingSpacepftCongruentupCapDoubleVerticalBarElementqualTildexistsGreaterEqualFullEqualGreaterLessSlantEqualTildeHumpDownHumpEqualLeftTriangleBarEqualssEqualGreaterLessSlantEqualTildeNestedGreaterGreaterLessLessPrecedesEqualSlantEqualReverseElementightTriangleBarEqualSquareSubsetEqualpersetEqualubsetEqualcceedsEqualSlantEqualTildepersetEqualTildeEqualFullEqualTildeVerticalBarscrtildeuOEligacutecircydblacfrgravemacregaicronopfpenCurlyDoubleQuoteQuoterscrlashtildemesumlverBarraceketParenthesisPartialDcyfrhiilusMinusoincareplanepfrecedesEqualSlantEqualTildeimeoductportionalscriQUOTfropfscrRBarrEGacutengrrtlcaronedilyeverseElementquilibriumUpEquilibriumfrhoightAngleBracketrrowBarLeftArrowCeilingDoubleBracketwnTeeVectorVectorBarFloorTeeArrowVectorriangleBarEqualUpDownVectorTeeVectorVectorBarVectorBararrowopfundImpliesrightarrowscrhuleDelayedSHCHcycyOFTcyacutecaronedilircyfrhortDownArrowLeftArrowRightArrowUpArrowigmamallCircleopfqrtuareIntersectionSubsetEqualpersetEqualUnionscrtarubsetEqualcceedsEqualSlantEqualTildehThatmpersetEqualsetTHORNRADESHcycyabucaronedilyfrhereforetaickSpacenSpaceildeEqualFullEqualTildeopfripleDotscrtrokUacuterrocirbrcyevecircydblacfrgravemacrnderBarraceketParenthesisionPlusogonpfpArrowBarDownArrowDownArrowEquilibriumTeeArrowarrowdownarrowperLeftArrowRightArrowsilonringscrtildeumlVDashbarcydashleerbarticalBarLineSeparatorTildeyThinSpacefropfscrvdashWcircedgefropfscrXfriopfscrYAcyIcyUcyacutecircyfropfscrumlZHcyacutecaronydoteroWidthSpacetafropfscraacutebrevecEdircuteyeligfrgravelefsymphphamacrlgpndanddslopevgelemsdaabcdefghrtvbdsphtzarrogonpfpEacireidosproxeqringscrtympeqtildeumlwconintintbNotackcongepsilonprimesimeqrveewedgebrktbrkcongydquoecausemptyvpsirnoutahweenfrigcapircupodotplustimessqcuptartriangledownupuplusveewedgekarowlacklozengesquaretriangledownleftrightnkk12434ocknequivotopfttomwtiexDLRlrHDUduULRlrVHLRhlrboxdLRlrhDUduminusplustimesuLRlrvHLRhlrprimerevevbarscremiimeolbhsubulletmpEeqcacutepandbrcupcapupdotsretoncapsronedilircupssmdotedilmptyvnterdotfrhcyeckmarkiirEceqlearrowleftrightdRSastcircdashefnintmidscirlubsuitoloneqmmatpfnlementxesngdotintpfrodysrrarrossscrubepetdotudarrlreprsclarrppbrcapcapupdotorsrarrmlyeqprecsuccveewedgerenvearrowleftrightveewedwconintintylctydArrHaraggerlethrrshvbkarowlaccaronydaggerrrotseqegltamptyvfishtrharlriamondsuitsegammasinvideontimesonxjcylcornropollarpfteqdotminusplussquareublebarwedgewnarrowdownarrowsharpoonleftrightrbkarowcornropscryoltroktdotrifuarrharwanglezcyigrarreDDototacutestercaronircolonydotefDotrgravesdotlinterslsdotmacrptysetvsp134ngspogonpfparsllussilonvqcircolonsimlantgtrlessualsestivDDvparslrDotarrscrdotimtahumlroxclistpectationonentialefallingdotseqcyemalefiligligligriligjliglatligtnsnofopfrallkvpartintrac123456823534584556878slownscrgElacutemmadpbrevecircydotelqqslantsccdotollesfrggimeljcylEajnEapproxeqqsimopfravescrimeltccirdotlParquestrapproxrrdoteqlessqlesslesssimvertneqqnEhArrairsplfmiltrdcyrcirwbarcirceartsuitlliprconfrksearowwarowoarrmthtokleftarrowrightarrowpfrbarscrlashtrokybullpheniacutecircyecyxclffrgraveiiintntnfinotajligmacrgelinepartthofpedncarefintieodottcalegersrcallarhkprodocygonpftaprodquestscrinEdotsvvtildeukcymljcircyfrmathopfscrercyukcykappavcedilyfrgreenhcyjcyopfscrlAarrrrtailBarrEgHaracuteemptyvgranmbdangdlepquorrbfsfshklpplsimtltailesbarrbrkracekkeslducaronedililubydcaquorrdharusharsheftarrowtailharpoondownupleftarrowsrightarrowsharpoonssquigarrowthreetimesgqqslantsccdotorgessapproxdoteqgtrqgtrgtrsimfishtloorrgEhardulblkjcylarrcornerhardtrimidotoustachenEapproxeqqsimoangrrbrkngleftarrowrightarrowmapstorightarrowoparrowleftrightparflustimeswastbarzengefparltrarrcornerhardmtrisaquocrhimegqbuortroktccirdothreeimeslarrquestrPariefurdsharuharvertneqqnEmDDotacrletesepstodownleftuprkercommaydasheasuredanglefrhoicrodastcirdotnusbdulcpdrnplusodelspfpscrtposultimapmapnGgtvLeftarrowrightarrowltvRightarrowVDashdashablacutengpEidosproxturalsbspumpecapronedilongdotupydasheArrarhkrowdotquivsearimxistsfrgEeqqslantssimtrhArrarrparisdvjcylArrEarrdreftarrowrightarrowqqslantsssimtriemidopftinEdotvabcnivabcparallelsltolintrcueeceqrArrarrcwightarrowtriesccueerhortmidparallelimeqmidparqsubepeubEeseteqqcceqpEeseteqqtglildelgrianglelefteqrightequmerospvDashHarrapdashgetinfinlArretrierArrtriesimwArrarhkrownearoSacutestcircydashblacivotsoldeligfcirrgonravethbarmintlarrcirrossinetmacregaicrondnusopfparerplusrarrderoffmigoforslopevscrlasholtildemesasumlvbarparallelsimltcyercntiodmilptenkfrhivmmatoneitchforkvlanckhkvusacirbcirdouemnsimtwomointintpfundrEapcueecapproxcurlyeqeqnapproxeqqsimsimimesnEapsimodfalarlinesurfptosimurelscriuncspqfrintopfprimescruaternionsintesteqotrAarrrrtailBarrHaraceutedicemptyvngdelequorrapbfscfshklpplsimtlwtailionalsbarrbrkracekkeslducaronedililubydcaldharquorshealinepartsctgfishtloorrhardulovightarrowtailharpoondownupleftarrowsharpoonsrightarrowssquigarrowthreetimesngsingdotseqlarrharmmoustachenmidoangrrbrkparflustimespargtpolintrarrsaquocrhqbuorthreeimesriefltriuluharxsacutebquocEaproncueedilircnEapsimpolintsimydotbeeArrarhkrowctmiswartminusnxtfrownharpchcyyortmidparallelyigmafvmdoteqgElEneplusrarrlarrmallsetminusshpeparslidletesoftcylbarpfpadesuitrqcapsupssubeseteqpesetequareffrarrscretmnmiletarftarfraightepsilonphinsubEdotedotmultnEeplusrarrseteqqneqqimubpccapproxcurlyeqeqnapproxeqqsimsimmngp123EdotsubedothsolublarrmultnEeplusseteqqneqqimubpwArrarhkrownwarzligtargetubrkcaronedilydotelrecfrhere4foretasymvickapproxsimnspkapsimornildemesbardntoeapbotcirforksaprimeradeiangledownlefteqqrighteqdoteminusplussbtimepeziumscryhcytrokwixtoheadleftarrowrightarrowuArrHaracuterrbrcyevecircydarrblacharfishtrgraveharlrblklcornerroptrimacrlogonpfparrowdownarrowharpoonleftrightlussihlonuparrowsrcornerropingtriscrtdotilderifuarrmlwanglevArrBarvDashangrtrepsilonkappanothingphiiroptorhosigmaubsetneqqpsetneqqthetariangleleftrightcydasheebareqlliprbartfrltrinsubpopfproprtriscrubnEepnEezigzagwcircedbargeqierpfropfpreathscrxcapircupdtrifrhArrarrilArrarrmapnisodotpflustimerArrarrscrqcupuplustriveewedgeyacuteycircyenfricyopfscrucymlzacutecaronydoteetrftafrhcyigrarropfscrwjnjC(D%D($(D'%$$ED($'$'$%$'%E$/D'$F%'D(D&#,%%&&$%$)%+%%$E$F$'$&$(#'D&$(%$&4%($(E'%&%($&$)%*$%$%$+)()')($:&5-($'($%*&&&/%%&)%@$'$F$%&&#%%)$&$&$&$(%%%&$(%$$%&%$E$2.&0,.(.(&'%.$F%$&&&(%6)&+*),---&*/1---)-.&)*+,).%*,&,*'('2+,+)1&'1,)2&'&*('($F%'#&D%D($(E&%$$&$ED($)$'%1(2$'%E$)$'((&+$&%%$%D&$(%-#&$E$3)2$F%'%+$&#'D$$'($$($(%&%$$&$E$$$F$./'*,***'*-*($F$$#)$'%$$'$%$.$&%/$&%'$.'(#'$'$&D(D'%$$&$%D($$%&&*%($%&('+%/,($'%E%%$&$($'E%#(%$$E$F$F%'$'#'$&$'$(%$$E$F$F#'D$$(%'%%%+%%$(%'%$$2(',&,-'*'0).+)1&'('-,)'&*(*)(*/&/('/),))/&')-&'('-%1','*'''-'($E$$%+$($/+-'-',+-'-%E%/(-$&%$%'$$#&$%$-%*$E$+$F$&$$#'$($(%'%$$5+-.)+0%5)+%($E$)%1%%%$&,'(&4&*''+H'(&*-(-L-J-'-M-(&O*H&/2F2((%*(***G*M*(&W,K&+.H.-&1'/3F3(&O2(.I4('H,(().H.-.H(I.(&(+(+,+(&.$FD($$#(D(D'%$$($ED($'%&%($F$6,($$$FE'D(&&D&$)('+&'.#+$%$E$%$$$+$/%%$$%)+(+-+(%&%(&*-%$F%$C'$E$&$F#(D%$(%%%%'%$(%'%$$$%/+-*0$%$%$3)'-&-,(*(0*.,)2&(((&+(+))*0&0((/*,*)0&().&(($&%-$-$&%$$-#)%%$($($$%'%'%&%$$E$0(,(-(*$'$-$F$&%')/))/(+)1()($F$&$%&&)(%)+(+-+(&(%$%$&(+(&&C($'$'%%$%%$$(%'%$$E$+&%%K&)$'(((,(($F$+$F%'C)%%''$'&&D'%$$($ED($'$*)',&(.%&('$'%E$)*&*,%,%.%&((%(%,%/(-%%'&$'$F$(D&#($&$%$'($$%%'&$'*+'+,+(&-$E$F$F$(#($'$E$F$F#F$$$F$F#'$&$&D($'%$$E$F$F$&#'$($(%$$&$0%%$%$&$FC)$($$%D%$E&E&%$D'$$%DD($)&%%&$'&%E$$%&&&$&(&$%$&$&%&&)%*$*$*$*$*$*$*$&%(%*$&&'$&'$'%E$$%$%'%$%%%%%')%D'$F%$%&(%D(D&$*%&#'$*'*'('&*%%'&&)%$&''$'%$$'$()$%(%&%'%%&$&'$E$('&'%&''''(&('&&/.%&(&&&($($.()(+0'0'0(&%%&'$&%%&$E&G%%$F%$&&%'%&'$'$'$&$'$'$'$'$&%'$'$'$&$'$'$'$'$'$'$&&&%'$'$'$&$'$'$'$'$&(&'&(&%'$'$'$&$'$'$'$'$'$'$$($'E'$F%&%%'$%%'$''$&'%%%'$'$($#)%$&&&(&&'%&&&D%&&%$'&&E'%&%&(%$&D'%(E%'($E$&%&('%$$%&$&$'%'..()%*$*&*'*'&$&(&&&'$'(&$'($)$%&($&$'%'))&%%'&&&%E&&F$'%$'%&$F%%'$&$'$$'$))$%&&%%')$%$&(&&'%&&&%&D%')$&+*'(&((F&&.-(%&%&$*%&$(#'$&$(%'%%%%'$$)%&$(%$$$%(&%%(D%%&%($(%D$''$$&'&*''$%$%(%&%$F&)*&&$&$(&&$(%E%$&%(&&(&'&)%/%*'-'..($*%'&&$F&$%%%'$'%%'$$'%&$)$&%)#(%%D(%'$(%%G$%'%$$&$$$'%D$$E'%$&&$$%)%$%$&&$'%&(&($%%'%($$%%%$'%E$&'%%&%%'&'$$(&'%&&**'%'&&&%(%%)$'%&$&%&%%$%E$D&%%$&%&%,&,#0$%$($(%&&&%D$'$G$&%&%&$&$F%'&$'$$*D(($H$($($($'%($G%($($'%'%($'%&%%&$F#%%$$(%&($%$$($'%$$&$$%$%$&$&(%$&%&&)$*$&D'%$E$$%$$'$&$$%$%$%$$%%%''%$&$'$%&$F$'$&%%'$'$D$%%&%%&%'%(%*'%&&&)((&'&&$K%E#'$(%%%'%'&$'&'$$&$'$()&%'%'$E$*&($'%'%.'-%E%'$F%'%'$(%'C)$$E&%$$&E&$%%DD($$%'&%%'%&$'$'&%''''&%%%%&$$%'%&(&%'%$&&&(''&(&'$&%&%E%%$'D($F%%'$'&'$($'$$$%'$'E%#(%$$E$'$F$F%'$'#(($$(%$$E$($&$&$F$F#(%%%'$'$$%$$&$(%)%'%'%%'$'%%$E&%%'$(%'%'%'%'%'&'%%$&&&$'D$'%&%'($&%'&)$$(%'&%%%%$$&%&($%(&(%%$$%*,''..%'-'-1$,+,-'-%$%$&$&(%$&%&&)$*$&D'%&*'&'()''&'&$(%'%D$$%$$''$($%&$&$$%&%)%'%&$(%')'$%%%''%$&$'$%&$'&%%&%.+-')'-%.,(%&&D&&%(%'&&%$&'&$$&'%$'%)%&($%$%&$(%E%$%%'$'$%%&%($%'D$%%&%%&%'%'%'%(%'&$'$'$$*&'$K%E#(D&%%&$'&%$&&)')')%%'$(%$$'$/$E$%D'%$&&&&F&%&($($)$$&%%$($(%E$$$F%'$$%)%&#F%D&D$,(-%D%D&D$-$(%'$'%'%E%$&D&E&%&'%&(%*$D&%F(D$&&&%'%&(F%%%$$'$$%&%''$(%%F%'%'&E%')$$E$E%$&$'D'H&D%&%$&$$'%&%&$$%$&$%$$&$'%D%&%%%$&*(-&$'D'H&D'$%&%$&%($$&$FE$&%(D(F(%)$)$&%(%)$)$$&'('E'D%(%$&&&D'$(E$'%&(D(D%,%&($$%&&&D&D%*)+%%'$($%&%&%((%%%'D'$'F*%,D&%(E&$'D'$'F*%,D$&E'%%%.0%,(1%$$%$&&&%$(%'%E%'%E&D%(%'&D&D'F%'&G%F$'%''$(%%'#%D(%%$&G$%$$'%'%%%%%'$'$'%D$&E'%$$'%$$&$'%&&'%&%$$'%&%(&$&&$F$&%&%&$$%&%$&%(%F$F$%'%%%(%$$&E'%%D(&&)%D&$'#&F$''&&'$&$$%$(&&&&&$&'$E$%&$%'%&$$%*%$$()$'%%%'''$'&'%($'$G%'&'&$$$*%EE&$$%$%%%&%$&$')'*'%'*(&(&'&%&($%%&%&&%%&(''''&$'%%&%'$F%$$(#F$&$F$($F$-'&%&(%E%#(%%%'$'$&$F&&%&%)%%'$'$'%E&%%'%'$(%'$'%'%'%'%'&'%'$%'&%('$'%&%'($&%'&)$$(%'&%%%%$$&%(%&($%%$&'&'''$%%E$$(%'%D$''$($%$&$$,-'(./%(-,+(.(-(-%%%-$'%&%$$()'$'$'&%%&%&&D&&%($&'%%)$'$(%E%$%%&%($$(%'%%'$'$''$)$$#)$'$$%$%%&&%&%$&&%&%%&%&&%)%&%$$&'$'$$'%''$(%E%%%%'%)'$%%$E&&$'%'&$%)(+E$$'($($%$&&&$'$&$'$&$'$&%&'&'$'$/&&%)%%&%%$&$'D$(%$&$'%%E$()&&$$'(D&%(D%&($(&+%'$($(&+%%$&&($&$$'$F%'%'%'$&'$%0+&&%$%&$&&&$'&&'&%'$&'&'&&)%+$)&,$'%'%($%%')'*'%'*(&(&'&%$%%%$F$F$F$&$&&'&&$'&&'(%&'&'&%'$&'&&)%+$)&,$'%'%($$'%''$(%%'D'#)%$$&$(%'%$$&$($E$(('&%(&($%,(&&&%&&&E&$'E&($)%($%%$&%$&&&&&D'&%%$($'%)+'+'/%+$+(0%&&&$&(&'&%&'%)$F&$%&%'$'%1*-#'$&D(%%$'&&D'%$$'%'%&$(%DD($''$%&$()%&&%&$'E$$'%E$)%,%.,(%&%%'$'&%+$()%&&%&%&$F$'%'%%'$$'E%$)#'$&'$$'$(%+&(&*&&'$'(&$'%&('K/D(J/D&('..($%$'$%&&&%%'%'&$$E$'$G'D$F$'$'$F%G(D&F(D$)#($(&%($%'$E$F$$$$%'$F#'%&%%$'$E$'%&$$$'%&$&$&$'%E&&%'$'%&$F%'$(%&$&$(C)&$$'%$D%$E$&$F$F$&E%#)$(%$$&$(%%$E$&$)$F$F$%%%0@0000H8H40H000047P00P@001000@0B0HP@:H9T8P000LB8d@800@I0<110000QQ8400P10030005940@410020000Q02000@0200000@P0101@8000440400000000808000000000@00000000P`0000000040400@0004<000000000008000030000000000P020T400020@0@00000000000000000000000000P0000000400400000400220080000100000000000000000P000000000000P000000@00402000000000@00000000000000000000040000000000000", "Æ&ÁĂÂА𝔄ÀΑĀ⩓Ą𝔸⁡Å𝒜≔ÃÄ∖⫧⌆Б∵ℬΒ𝔅𝔹˘ℬ≎Ч©Ć⋒ⅅℭČÇĈ∰Ċ¸·ℭΧ⊙⊖⊕⊗∲”’∷⩴≡∯∮ℂ∐∳⨯𝒞⋓≍ⅅ⤑ЂЅЏ‡↡⫤ĎД∇Δ𝔇´˙˝`˜⋄ⅆ𝔻¨⃜≐∯¨⇓⇐⇔⫤⟸⟺⟹⇒⊨⇑⇕∥↓⤓⇵̑⥐⥞↽⥖⥟⇁⥗⊤↧⇓𝒟ĐŊÐÉĚÊЭĖ𝔈È∈Ē◻▫Ę𝔼Ε⩵≂⇌ℰ⩳ΗË∃ⅇФ𝔉◼▪𝔽∀ℱℱЃ>ΓϜĞĢĜГĠ𝔊⋙𝔾≥⋛≧⪢≷⩾≳𝒢≫Ъˇ^Ĥℌℋℍ─ℋĦ≎≏ЕĲЁÍÎИİℑÌℑĪⅈ⇒∬∫⋂⁣⁢Į𝕀ΙℐĨІÏĴЙ𝔍𝕁𝒥ЈЄХЌΚĶК𝔎𝕂𝒦Љ<ĹΛ⟪ℒ↞ĽĻЛ⟨←⇤⇆⌈⟦⥡⇃⥙⌊↔⥎⊣↤⥚⊲⧏⊴⥑⥠↿⥘↼⥒⇐⇔⋚≦≶⪡⩽≲𝔏⋘⇚Ŀ⟵⟷⟶⟸⟺⟹𝕃↙↘ℒ↰Ł≪⤅М ℳ𝔐∓𝕄ℳΜЊŃŇŅН​​​​≫≪\n𝔑⁠\xA0ℕ⫬≢≭∦∉≠≂̸∄≯≱≧̸≫̸≹⩾̸≵≎̸≏̸⋪⧏̸⋬≮≰≸≪̸⩽̸≴⪢̸⪡̸⊀⪯̸⋠∌⋫⧐̸⋭⊏̸⋢⊐̸⋣⊂⃒⊈⊁⪰̸⋡≿̸⊃⃒⊉≁≄≇≉∤𝒩ÑΝŒÓÔОŐ𝔒ÒŌΩΟ𝕆“‘⩔𝒪ØÕ⨷Ö‾⏞⎴⏜∂П𝔓ΦΠ±ℌℙ⪻≺⪯≼≾″∏∷∝𝒫Ψ\"𝔔ℚ𝒬⤐®Ŕ⟫↠⤖ŘŖРℜ∋⇋⥯ℜΡ⟩→⇥⇄⌉⟧⥝⇂⥕⌋⊢↦⥛⊳⧐⊵⥏⥜↾⥔⇀⥓⇒ℝ⥰⇛ℛ↱⧴ЩШЬŚ⪼ŠŞŜС𝔖↓←→↑Σ∘𝕊√□⊓⊏⊑⊐⊒⊔𝒮⋆⋐⋐⊆≻⪰≽≿∋∑⋑⊃⊇⋑Þ™ЋЦ	ΤŤŢТ𝔗∴Θ   ∼≃≅≈𝕋⃛𝒯ŦÚ↟⥉ЎŬÛУŰ𝔘ÙŪ_⏟⎵⏝⋃⊎Ų𝕌↑⤒⇅↕⥮⊥↥⇑⇕↖↗ϒΥŮ𝒰ŨÜ⊫⫫В⊩⫦⋁‖‖∣|❘≀ 𝔙𝕍𝒱⊪Ŵ⋀𝔚𝕎𝒲𝔛Ξ𝕏𝒳ЯЇЮÝŶЫ𝔜𝕐𝒴ŸЖŹŽЗŻ​Ζℨℤ𝒵áă∾∾̳∿â´аæ⁡𝔞àℵℵαā⨿&∧⩕⩜⩘⩚∠⦤∠∡⦨⦩⦪⦫⦬⦭⦮⦯∟⊾⦝∢Å⍼ą𝕒≈⩰⩯≊≋'≈≊å𝒶*≈≍ãä∳⨑⫭≌϶‵∽⋍⊽⌅⌅⎵⎶≌б„∵∵⦰϶ℬβℶ≬𝔟⋂◯⋃⨀⨁⨂⨆★▽△⨄⋁⋀⤍⧫▪▴▾◂▸␣▒░▓█=⃥≡⃥⌐𝕓⊥⊥⋈╗╔╖╓═╦╩╤╧╝╚╜╙║╬╣╠╫╢╟⧉╕╒┐┌─╥╨┬┴⊟⊞⊠╛╘┘└│╪╡╞┼┤├‵˘¦𝒷⁏∽⋍\\⧅⟈••≎⪮≏≏ć∩⩄⩉⩋⩇⩀∩︀⁁ˇ⩍čçĉ⩌⩐ċ¸⦲¢·𝔠ч✓✓χ○⧃ˆ≗↺↻®Ⓢ⊛⊚⊝≗⨐⫯⧂♣♣:≔≔,@∁∘∁ℂ≅⩭∮𝕔∐©℗↵✗𝒸⫏⫑⫐⫒⋯⤸⤵⋞⋟↶⤽∪⩈⩆⩊⊍⩅∪︀↷⤼⋞⋟⋎⋏¤↶↷⋎⋏∲∱⌭⇓⥥†ℸ↓‐⊣⤏˝ďдⅆ‡⇊⩷°δ⦱⥿𝔡⇃⇂⋄⋄♦♦¨ϝ⋲÷÷⋇⋇ђ⌞⌍$𝕕˙≐≑∸∔⊡⌆↓⇊⇃⇂⤐⌟⌌𝒹ѕ⧶đ⋱▿▾⇵⥯⦦џ⟿⩷≑é⩮ě≖ê≕эėⅇ≒𝔢⪚è⪖⪘⪙⏧ℓ⪕⪗ē∅∅∅   ŋ ę𝕖⋕⧣⩱εεϵ≖≕≂⪖⪕=≟≡⩸⧥≓⥱ℯ≐≂ηðë€!∃ℰⅇ≒ф♀ﬃﬀﬄ𝔣ﬁfj♭ﬂ▱ƒ𝕗∀⋔⫙⨍½⅓¼⅕⅙⅛⅔⅖¾⅗⅜⅘⅚⅝⅞⁄⌢𝒻≧⪌ǵγϝ⪆ğĝгġ≥⋛≥≧⩾⩾⪩⪀⪂⪄⋛︀⪔𝔤≫⋙ℷѓ≷⪒⪥⪤≩⪊⪊⪈⪈≩⋧𝕘`ℊ≳⪎⪐>⪧⩺⋗⦕⩼⪆⥸⋗⋛⪌≷≳≩︀≩︀⇔ ½ℋъ↔⥈↭ℏĥ♥♥…⊹𝔥⤥⤦⇿∻↩↪𝕙―𝒽ℏħ⁃‐í⁣îие¡⇔𝔦ìⅈ⨌∭⧜℩ĳīℑℐℑı⊷Ƶ∈℅∞⧝ı∫⊺ℤ⊺⨗⨼ёį𝕚ι⨼¿𝒾∈⋹⋵⋴⋳∈⁢ĩіïĵй𝔧ȷ𝕛𝒿јєκϰķк𝔨ĸхќ𝕜𝓀⇚⇐⤛⤎≦⪋⥢ĺ⦴ℒλ⟨⦑⟨⪅«←⇤⤟⤝↩↫⤹⥳↢⪫⤙⪭⪭︀⤌❲{[⦋⦏⦍ľļ⌈{л⤶“„⥧⥋↲≤←↢↽↼⇇↔⇆⇋↭⋋⋚≤≦⩽⩽⪨⩿⪁⪃⋚︀⪓⪅⋖⋚⪋≶≲⥼⌊𝔩≶⪑↽↼⥪▄љ≪⇇⌞⥫◺ŀ⎰⎰≨⪉⪉⪇⪇≨⋦⟬⇽⟦⟵⟷⟼⟶↫↬⦅𝕝⨭⨴∗_◊◊⧫(⦓⇆⌟⇋⥭‎⊿‹𝓁↰≲⪍⪏[‘‚ł<⪦⩹⋖⋋⋉⥶⩻⦖◃⊴◂⥊⥦≨︀≨︀∺¯♂✠✠↦↦↧↤↥▮⨩м—∡𝔪℧µ∣*⫰·−⊟∸⨪⫛…∓⊧𝕞∓𝓂∾μ⊸⊸⋙̸≫⃒≫̸⇍⇎⋘̸≪⃒≪̸⇏⊯⊮∇ń∠⃒≉⩰̸≋̸ŉ≉♮♮ℕ\xA0≎̸≏̸⩃ňņ≇⩭̸⩂н–≠⇗⤤↗↗≐̸≢⤨≂̸∄∄𝔫≧̸≱≱≧̸⩾̸⩾̸≵≯≯⇎↮⫲∋⋼⋺∋њ⇍≦̸↚‥≰↚↮≰≦̸⩽̸⩽̸≮≴≮⋪⋬∤𝕟¬∉⋹̸⋵̸∉⋷⋶∌∌⋾⋽∦∦⫽⃥∂̸⨔⊀⋠⪯̸⊀⪯̸⇏↛⤳̸↝̸↛⋫⋭⊁⋡⪰̸𝓃∤∦≁≄≄∤∦⋢⋣⊄⫅̸⊈⊂⃒⊈⫅̸⊁⪰̸⊅⫆̸⊉⊃⃒⊉⫆̸≹ñ≸⋪⋬⋫⋭ν#№ ⊭⤄≍⃒⊬≥⃒>⃒⧞⤂≤⃒<⃒⊴⃒⤃⊵⃒∼⃒⇖⤣↖↖⤧Ⓢó⊛⊚ôо⊝ő⨸⊙⦼œ⦿𝔬˛ò⧁⦵Ω∮↺⦾⦻‾⧀ōωο⦶⊖𝕠⦷⦹⊕∨↻⩝ℴℴªº⊶⩖⩗⩛ℴø⊘õ⊗⨶ö⌽∥¶∥⫳⫽∂п%.‰⊥‱𝔭φϕℳ☎π⋔ϖℏℎℏ+⨣⊞⨢∔⨥⩲±⨦⨧±⨕𝕡£≺⪳⪷≼⪯≺⪷≼⪯⪹⪵⋨≾′ℙ⪵⪹⋨∏⌮⌒⌓∝∝≾⊰𝓅ψ 𝔮⨌𝕢⁗𝓆ℍ⨖?≟\"⇛⇒⤜⤏⥤∽̱ŕ√⦳⟩⦒⦥⟩»→⥵⇥⤠⤳⤞↪↬⥅⥴↣↝⤚∶ℚ⤍❳}]⦌⦎⦐řŗ⌉}р⤷⥩””↳ℜℛℜℝ▭®⥽⌋𝔯⇁⇀⥬ρϱ→↣⇁⇀⇄⇌⇉↝⋌˚≓⇄⇌‏⎱⎱⫮⟭⇾⟧⦆𝕣⨮⨵)⦔⨒⇉›𝓇↱]’’⋌⋊▹⊵▸⧎⥨℞ś‚≻⪴⪸š≽⪰şŝ⪶⪺⋩⨓≿с⋅⊡⩦⇘⤥↘↘§;⤩∖∖✶𝔰⌢♯щш∣∥­σςς∼⩪≃≃⪞⪠⪝⪟≆⨤⥲←∖⨳⧤∣⌣⪪⪬⪬︀ь/⧄⌿𝕤♠♠∥⊓⊓︀⊔⊔︀⊏⊑⊏⊑⊐⊒⊐⊒□□▪▪→𝓈∖⌣⋆☆★ϵϕ¯⊂⫅⪽⊆⫃⫁⫋⊊⪿⥹⊂⊆⫅⊊⫋⫇⫕⫓≻⪸≽⪰⪺⪶⋩≿∑♪⊃¹²³⫆⪾⫘⊇⫄⟉⫗⥻⫂⫌⊋⫀⊃⊇⫆⊋⫌⫈⫔⫖⇙⤦↙↙⤪ß⌖τ⎴ťţт⃛⌕𝔱∴∴θϑϑ≈∼ ≈∼þ˜×⊠⨱⨰∭⤨⊤⌶⫱𝕥⫚⤩‴™▵▿◃⊴≜▹⊵◬≜⨺⨹⧍⨻⏢𝓉цћŧ≬↞↠⇑⥣ú↑ўŭûу⇅ű⥮⥾𝔲ù↿↾▀⌜⌜⌏◸ū¨ų𝕦↑↕↿↾⊎υϒυ⇈⌝⌝⌎ů◹𝓊⋰ũ▵▴⇈ü⦧⇕⫨⫩⊨⦜ϵϰ∅ϕϖ∝↕ϱς⊊︀⫋︀⊋︀⫌︀ϑ⊲⊳в⊢∨⊻≚⋮||𝔳⊲⊂⃒⊃⃒𝕧∝⊳𝓋⫋︀⊊︀⫌︀⊋︀⦚ŵ⩟∧≙℘𝔴𝕨℘≀≀𝓌⋂◯⋃▽𝔵⟺⟷ξ⟸⟵⟼⋻⨀𝕩⨁⨂⟹⟶𝓍⨆⨄△⋁⋀ýяŷы¥𝔶ї𝕪𝓎юÿźžзżℨζ𝔷ж⇝𝕫𝓏‍‌"], re = 2654435761, h = 2246822507, g = 1024, _ = (() => {
	let e = /* @__PURE__ */ new Uint8Array(128);
	for (let t = 48; t <= 57; t++) e[t] = t - 47;
	for (let t = 65; t <= 90; t++) e[t] = t - 54;
	for (let t = 97; t <= 122; t++) e[t] = t - 60;
	return e;
})();
function ie(e, t, n) {
	return e.charCodeAt(t) << 25 | e.charCodeAt(t + 1) << 18 | e.charCodeAt(t + n - 2) << 11 | _[e.charCodeAt(t + n - 1)] << 5 | n;
}
function v(e, t) {
	return (e * 3 << 3 ^ t) & 1023;
}
function ae(e, t) {
	return (Math.imul(e, re) >>> 16) * t >>> 16;
}
function oe(e, t) {
	return (Math.imul(e, h) >>> 16) * t >>> 16;
}
function se(e) {
	let [t, n] = e, r = t.charCodeAt(0) - 48 << 6 | t.charCodeAt(1) - 48, i = t.charCodeAt(2) - 48 << 6 | t.charCodeAt(3) - 48, a = t.charCodeAt(4) - 48 << 6 | t.charCodeAt(5) - 48, o = 6 + i, s = o + 2 * r, c = 2 * a, l = new Int32Array(c), u = new Uint16Array(c), d = new Uint16Array(c), f = new Uint32Array(g), ee = /* @__PURE__ */ new Map(), p = [], m = "", te = 6, ne = 0;
	for (let e = 0; e < r; e++) {
		let n = t.charCodeAt(o + 2 * e) - 35, r = t.charCodeAt(o + 2 * e + 1) - 35, i = n & 31, c = i + (r & 31), re = (r >> 5) + 1;
		m = m.slice(0, i) + t.slice(te, te + c - i), te += c - i;
		let h = ie(m, 0, c), g = 2 * (t.charCodeAt(s + Math.floor(e / 6)) - 48 & 1 << e % 6 ? oe : ae)(h, a);
		if (l[g] !== 0 && (g += 1), l[g] = h, c > 4) {
			let e = m.slice(2, c - 2), t = ee.get(e);
			if (t === void 0) {
				ee.set(e, p.length), u[g] = p.length;
				for (let t = 0; t < e.length; t += 2) p.push(e.charCodeAt(t) | e.charCodeAt(t + 1) << 16);
			} else u[g] = t;
		}
		let _ = v(m.charCodeAt(0), m.charCodeAt(1));
		f[_] |= c <= 16 ? 1 << c - 2 : 32768, n & 32 && (f[_] |= 1 << c - 2 + 16), d[g] = ne << 2 | re - 1 | (n & 32) >> 4, ne += re;
	}
	return {
		keys: l,
		buckets: a,
		slotMidOff: u,
		slotValue: d,
		values: n,
		lengthBits: f,
		middles: new Uint32Array(p)
	};
}
// node_modules/entities/dist/decode.js
var ce = 38, le = 35, y = 59, ue = 61, de = 48, fe = 97, pe = 120, me = 65, he = 32;
function ge(e) {
	return e - de >>> 0 <= 9;
}
function _e(e) {
	return ge(e) || (e | he) - fe >>> 0 <= 25;
}
function ve(e) {
	return e === ue || _e(e);
}
var b;
(function(e) {
	e[e.Legacy = 0] = "Legacy", e[e.Strict = 1] = "Strict", e[e.Attribute = 2] = "Attribute";
})(b ||= {});
var x = /* #__PURE__ */ se(ne), ye = x.keys, be = x.buckets, xe = x.slotMidOff, Se = x.lengthBits, Ce = x.middles, S = x.slotValue, we = x.values;
function Te(e) {
	let t = e >> 2;
	return e & 1 ? we.slice(t, t + (e & 1) + 1) : we.charAt(t);
}
function Ee(e, t, n) {
	let r = e.charCodeAt(t), i = e.charCodeAt(t + 1), a = e.charCodeAt(t + n - 2), o = e.charCodeAt(t + n - 1);
	if ((r | i | a | o) > 127) return -1;
	let s = r << 25 | i << 18 | a << 11 | _[o] << 5 | n, c = 2 * ((Math.imul(s, re) >>> 16) * be >>> 16);
	for (let r = 0;; r++) {
		if (ye[c] === s && (n <= 4 || De(c, e, t, n))) return c;
		if (ye[c + 1] === s && (n <= 4 || De(c + 1, e, t, n))) return c + 1;
		if (r === 1) return -1;
		c = 2 * ((Math.imul(s, h) >>> 16) * be >>> 16);
	}
}
function De(e, t, n, r) {
	let i = xe[e], a = n + 2, o = n + r - 2;
	for (; a + 1 < o;) {
		if ((t.charCodeAt(a) | t.charCodeAt(a + 1) << 16) !== Ce[i++]) return !1;
		a += 2;
	}
	return a === o || t.charCodeAt(a) === (Ce[i] & 65535);
}
var Oe = 21, ke = 2097151, Ae = 2047, je = 0;
function Me(e) {
	let t = e >>> Oe;
	return t === Ae ? je : t;
}
var Ne = /* #__PURE__ */ (() => {
	let e = (/* @__PURE__ */ new Uint8Array(128)).fill(255);
	for (let t = 0; t < 10; t++) e[de + t] = t;
	for (let t = 0; t < 6; t++) e[me + t] = t + 10, e[fe + t] = t + 10;
	return e;
})();
function Pe(e, t, n) {
	let r = e.length, i = t, a = 0, o;
	if ((e.charCodeAt(i) | he) === pe) for (i += 1, o = i; i < r;) {
		let t = e.charCodeAt(i);
		if (t >= 128) break;
		let n = Ne[t];
		if (n <= 15) a = a * 16 + n, i++;
		else break;
	}
	else for (o = i; i < r;) {
		let t = e.charCodeAt(i);
		if (t >= 128) break;
		let n = Ne[t];
		if (n <= 9) a = a * 10 + n, i++;
		else break;
	}
	if (i === o) return 0;
	a > 1114111 && (a = 1114112);
	let s = i - t + 2;
	if (i < r && e.charCodeAt(i) === y) s += 1;
	else if (n) return 0;
	return s >= Ae && (je = s, s = Ae), s << Oe | a;
}
function Fe(e, t, n) {
	let r = Se[v(e.charCodeAt(t), e.charCodeAt(t + 1))] >>> 16 & 31;
	for (; r !== 0;) {
		let i = 31 - Math.clz32(r);
		if (r ^= 1 << i, i + 2 > n) continue;
		let a = Ee(e, t, i + 2);
		if (a >= 0 && S[a] & 2) return a << 3 | i + 2;
	}
	return -1;
}
function Ie(e, t, n) {
	let r = e.slice(t, t + 32).indexOf(";");
	if (r - 2 >>> 0 <= 29) {
		let n = Ee(e, t, r);
		if (n >= 0) return n << 6 | r + 1;
	}
	if (n !== b.Strict) {
		let r = Fe(e, t, Math.min(31, e.length - t));
		if (r >= 0) {
			let i = r & 7;
			if (n !== b.Attribute || t + i >= e.length || !ve(e.charCodeAt(t + i))) return r >> 3 << 6 | i;
		}
	}
	return -1;
}
function Le(e, t) {
	return t >= e.length ? -1 : e.charCodeAt(t) === ce ? t : e.indexOf("&", t);
}
function Re(e, t) {
	let n = t !== b.Strict, r = e.indexOf("&");
	if (r < 0) return e;
	let i = e.length, a = "", o = 0;
	do {
		let s = r + 1;
		if (s + 1 >= i) break;
		let c = e.charCodeAt(s);
		if (c === ce) {
			r = s;
			continue;
		}
		if (c === le) {
			let t = Pe(e, s + 1, !n), i = Me(t);
			i === 0 ? r = e.indexOf("&", s) : (o !== r && (a += e.slice(o, r)), a += te(t & ke), o = r + i, r = Le(e, o));
			continue;
		}
		let l = Se[v(c, e.charCodeAt(s + 1))];
		if (l & 32768) {
			let n = Ie(e, s, t);
			n >= 0 ? (o !== r && (a += e.slice(o, r)), a += Te(S[n >> 6]), o = s + (n & 63), r = Le(e, o)) : r = e.indexOf("&", s);
			continue;
		}
		let u = l & 32767, d = -1;
		for (; u !== 0;) {
			let t = u & -u;
			u ^= t;
			let r = 33 - Math.clz32(t), a = s + r;
			if (a > i) break;
			let o = a < i && e.charCodeAt(a) === y;
			if (!(o || n && l >>> r + 14 & 1)) continue;
			let c = Ee(e, s, r);
			if (!(c < 0)) {
				if (o) {
					d = c << 6 | 32 | r + 1;
					break;
				}
				S[c] & 2 && (d = c << 6 | r);
			}
		}
		if (d >= 0) {
			let n = d & 31;
			if (d & 32 || t !== b.Attribute || s + n >= i || !ve(e.charCodeAt(s + n))) {
				o !== r && (a += e.slice(o, r)), a += Te(S[d >> 6]), o = s + n, r = Le(e, o);
				continue;
			}
		}
		r = e.indexOf("&", s + 1);
	} while (r >= 0);
	return a + e.slice(o);
}
function ze(e, t = b.Legacy) {
	return Re(e, t);
}
var Be = 0, Ve = 1, He = 2, Ue = 3, We = 4, Ge = class {
	emitCodePoint;
	errors;
	state = Be;
	consumed = 1;
	result = 0;
	decodeMode = b.Strict;
	replaceNumericCodePoint = m;
	constructor(e, t) {
		this.emitCodePoint = e, this.errors = t;
	}
	stateNumericStart(e, t) {
		return t >= e.length ? -1 : (e.charCodeAt(t) | he) === pe ? (this.state = Ue, this.consumed += 1, this.stateNumericHex(e, t + 1)) : (this.state = He, this.stateNumericDecimal(e, t));
	}
	stateNumericHex(e, t) {
		let n = e.length, { result: r, consumed: i } = this, a = t;
		for (; a < n;) {
			let t = e.charCodeAt(a), n = Ne[t];
			if (n <= 15) r = r * 16 + n;
			else return this.result = r, this.consumed = i, this.emitNumericEntity(t, 3);
			i += 1, a += 1;
		}
		return this.result = r, this.consumed = i, -1;
	}
	stateNumericDecimal(e, t) {
		let n = e.length, { result: r, consumed: i } = this, a = t;
		for (; a < n;) {
			let t = e.charCodeAt(a) - de;
			if (t >>> 0 > 9) return this.result = r, this.consumed = i, this.emitNumericEntity(t + de, 2);
			r = r * 10 + t, i += 1, a += 1;
		}
		return this.result = r, this.consumed = i, -1;
	}
	emitNumericEntity(e, t) {
		if (this.consumed <= t) return this.errors?.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
		if (e === y) this.consumed += 1;
		else if (this.decodeMode === b.Strict) return 0;
		return this.emitCodePoint(this.replaceNumericCodePoint(this.result), this.consumed), this.errors && (e !== y && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed;
	}
	startEntity(e) {
		this.decodeMode = e, this.state = Be, this.result = 0, this.consumed = 1;
	}
	write(e, t) {
		switch (this.state) {
			case Be: return e.charCodeAt(t) === le ? (this.state = Ve, this.consumed += 1, this.stateNumericStart(e, t + 1)) : (this.state = We, this.stateNamedEntity(e, t));
			case Ve: return this.stateNumericStart(e, t);
			case He: return this.stateNumericDecimal(e, t);
			case Ue: return this.stateNumericHex(e, t);
			default: return this.stateNamedEntity(e, t);
		}
	}
	end() {
		switch (this.state) {
			case We: return this.endNamedEntity();
			case He: return this.emitNumericEntity(0, 2);
			case Ue: return this.emitNumericEntity(0, 3);
			case Ve: return this.errors?.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
			default: return 0;
		}
	}
}, Ke = class extends Ge {
	runLength = 0;
	nameBuffer = /* @__PURE__ */ new Uint8Array(32);
	emitSlot(e) {
		let t = S[e], n = t >> 2;
		this.emitCodePoint(we.charCodeAt(n), this.consumed), t & 1 && this.emitCodePoint(we.charCodeAt(n + 1), this.consumed);
	}
	startEntity(e) {
		super.startEntity(e), this.runLength = 0;
	}
	stateNamedEntity(e, t) {
		let n = e.length;
		if (this.runLength === 0 && t + 17 <= n) {
			let r = Se[v(e.charCodeAt(t), e.charCodeAt(t + 1))];
			if (r & 32768 && t + 32 <= n) {
				let n = Ie(e, t, this.decodeMode);
				if (n >= 0) {
					let r = n & 63;
					return this.consumed = r + 1, this.emitSlot(n >> 6), e.charCodeAt(t + r - 1) !== y && this.errors?.missingSemicolonAfterCharacterReference(), this.consumed;
				}
				return 0;
			}
			let i = r & 32767;
			for (; i !== 0;) {
				let n = i & -i;
				i ^= n;
				let r = 33 - Math.clz32(n);
				if (e.charCodeAt(t + r) === y) {
					let n = Ee(e, t, r);
					if (n >= 0) return this.consumed = r + 2, this.emitSlot(n), this.consumed;
				}
			}
			if (!(r & 32768)) {
				if (this.decodeMode !== b.Strict) {
					let n = Fe(e, t, 31);
					if (n >= 0) {
						let r = n & 7, i = e.charCodeAt(t + r);
						return this.decodeMode === b.Attribute && ve(i) ? 0 : (this.consumed = r + 1, this.emitSlot(n >> 3), this.errors?.missingSemicolonAfterCharacterReference(), this.consumed);
					}
				}
				return 0;
			}
		}
		let r = t, { runLength: i } = this, a = -1, o = Math.min(n, t + 32 - i);
		for (; r < o;) {
			let t = e.charCodeAt(r);
			if (!_e(t)) {
				a = t;
				break;
			}
			this.nameBuffer[i++] = t, r++;
		}
		if (a < 0 && i < 32) return this.runLength = i, -1;
		if (a === y && i - 2 >>> 0 <= 29) {
			let e = qe(this.nameBuffer, i);
			if (e >= 0) return this.consumed = i + 2, this.emitSlot(e), this.consumed;
		}
		if (this.decodeMode !== b.Strict && i >= 2) {
			let e = Ye(this.nameBuffer, i);
			if (e >= 0) {
				let t = e & 7, n = t < i ? this.nameBuffer[t] : a;
				return this.decodeMode === b.Attribute && ve(n) ? 0 : (this.consumed = t + 1, this.emitSlot(e >> 3), this.errors?.missingSemicolonAfterCharacterReference(), this.consumed);
			}
		}
		return 0;
	}
	endNamedEntity() {
		if (this.decodeMode === b.Strict || this.runLength < 2) return 0;
		let e = Ye(this.nameBuffer, this.runLength);
		return e < 0 || this.decodeMode === b.Attribute && (e & 7) < this.runLength ? 0 : (this.consumed = (e & 7) + 1, this.emitSlot(e >> 3), this.errors?.missingSemicolonAfterCharacterReference(), this.consumed);
	}
};
function qe(e, t) {
	let n = e[0] << 25 | e[1] << 18 | e[t - 2] << 11 | _[e[t - 1]] << 5 | t, r = 2 * ((Math.imul(n, re) >>> 16) * be >>> 16);
	for (let i = 0;; i++) {
		if (ye[r] === n && (t <= 4 || Je(r, e, t))) return r;
		if (ye[r + 1] === n && (t <= 4 || Je(r + 1, e, t))) return r + 1;
		if (i === 1) return -1;
		r = 2 * ((Math.imul(n, h) >>> 16) * be >>> 16);
	}
}
function Je(e, t, n) {
	let r = xe[e], i = 2, a = n - 2;
	for (; i + 1 < a;) {
		if ((t[i] | t[i + 1] << 16) !== Ce[r++]) return !1;
		i += 2;
	}
	return i === a || t[i] === (Ce[r] & 65535);
}
function Ye(e, t) {
	let n = Se[v(e[0], e[1])] >>> 16 & 31;
	for (; n !== 0;) {
		let r = 31 - Math.clz32(n);
		if (n ^= 1 << r, r + 2 > t) continue;
		let i = qe(e, r + 2);
		if (i >= 0 && S[i] & 2) return i << 3 | r + 2;
	}
	return -1;
}
// node_modules/parse5/dist/common/html.js
var C;
(function(e) {
	e.HTML = "http://www.w3.org/1999/xhtml", e.MATHML = "http://www.w3.org/1998/Math/MathML", e.SVG = "http://www.w3.org/2000/svg", e.XLINK = "http://www.w3.org/1999/xlink", e.XML = "http://www.w3.org/XML/1998/namespace", e.XMLNS = "http://www.w3.org/2000/xmlns/";
})(C ||= {});
var w;
(function(e) {
	e.TYPE = "type", e.ACTION = "action", e.ENCODING = "encoding", e.PROMPT = "prompt", e.NAME = "name", e.COLOR = "color", e.FACE = "face", e.SIZE = "size";
})(w ||= {});
var T;
(function(e) {
	e.NO_QUIRKS = "no-quirks", e.QUIRKS = "quirks", e.LIMITED_QUIRKS = "limited-quirks";
})(T ||= {});
var E;
(function(e) {
	e.A = "a", e.ADDRESS = "address", e.ANNOTATION_XML = "annotation-xml", e.APPLET = "applet", e.AREA = "area", e.ARTICLE = "article", e.ASIDE = "aside", e.B = "b", e.BASE = "base", e.BASEFONT = "basefont", e.BGSOUND = "bgsound", e.BIG = "big", e.BLOCKQUOTE = "blockquote", e.BODY = "body", e.BR = "br", e.BUTTON = "button", e.CAPTION = "caption", e.CENTER = "center", e.CODE = "code", e.COL = "col", e.COLGROUP = "colgroup", e.DD = "dd", e.DESC = "desc", e.DETAILS = "details", e.DIALOG = "dialog", e.DIR = "dir", e.DIV = "div", e.DL = "dl", e.DT = "dt", e.EM = "em", e.EMBED = "embed", e.FIELDSET = "fieldset", e.FIGCAPTION = "figcaption", e.FIGURE = "figure", e.FONT = "font", e.FOOTER = "footer", e.FOREIGN_OBJECT = "foreignObject", e.FORM = "form", e.FRAME = "frame", e.FRAMESET = "frameset", e.H1 = "h1", e.H2 = "h2", e.H3 = "h3", e.H4 = "h4", e.H5 = "h5", e.H6 = "h6", e.HEAD = "head", e.HEADER = "header", e.HGROUP = "hgroup", e.HR = "hr", e.HTML = "html", e.I = "i", e.IMG = "img", e.IMAGE = "image", e.INPUT = "input", e.IFRAME = "iframe", e.KEYGEN = "keygen", e.LABEL = "label", e.LI = "li", e.LINK = "link", e.LISTING = "listing", e.MAIN = "main", e.MALIGNMARK = "malignmark", e.MARQUEE = "marquee", e.MATH = "math", e.MENU = "menu", e.META = "meta", e.MGLYPH = "mglyph", e.MI = "mi", e.MO = "mo", e.MN = "mn", e.MS = "ms", e.MTEXT = "mtext", e.NAV = "nav", e.NOBR = "nobr", e.NOFRAMES = "noframes", e.NOEMBED = "noembed", e.NOSCRIPT = "noscript", e.OBJECT = "object", e.OL = "ol", e.OPTGROUP = "optgroup", e.OPTION = "option", e.P = "p", e.PARAM = "param", e.PLAINTEXT = "plaintext", e.PRE = "pre", e.RB = "rb", e.RP = "rp", e.RT = "rt", e.RTC = "rtc", e.RUBY = "ruby", e.S = "s", e.SCRIPT = "script", e.SEARCH = "search", e.SECTION = "section", e.SELECT = "select", e.SOURCE = "source", e.SMALL = "small", e.SPAN = "span", e.STRIKE = "strike", e.STRONG = "strong", e.STYLE = "style", e.SUB = "sub", e.SUMMARY = "summary", e.SUP = "sup", e.TABLE = "table", e.TBODY = "tbody", e.TEMPLATE = "template", e.TEXTAREA = "textarea", e.TFOOT = "tfoot", e.TD = "td", e.TH = "th", e.THEAD = "thead", e.TITLE = "title", e.TR = "tr", e.TRACK = "track", e.TT = "tt", e.U = "u", e.UL = "ul", e.SVG = "svg", e.VAR = "var", e.WBR = "wbr", e.XMP = "xmp";
})(E ||= {});
var D;
(function(e) {
	e[e.UNKNOWN = 0] = "UNKNOWN", e[e.A = 1] = "A", e[e.ADDRESS = 2] = "ADDRESS", e[e.ANNOTATION_XML = 3] = "ANNOTATION_XML", e[e.APPLET = 4] = "APPLET", e[e.AREA = 5] = "AREA", e[e.ARTICLE = 6] = "ARTICLE", e[e.ASIDE = 7] = "ASIDE", e[e.B = 8] = "B", e[e.BASE = 9] = "BASE", e[e.BASEFONT = 10] = "BASEFONT", e[e.BGSOUND = 11] = "BGSOUND", e[e.BIG = 12] = "BIG", e[e.BLOCKQUOTE = 13] = "BLOCKQUOTE", e[e.BODY = 14] = "BODY", e[e.BR = 15] = "BR", e[e.BUTTON = 16] = "BUTTON", e[e.CAPTION = 17] = "CAPTION", e[e.CENTER = 18] = "CENTER", e[e.CODE = 19] = "CODE", e[e.COL = 20] = "COL", e[e.COLGROUP = 21] = "COLGROUP", e[e.DD = 22] = "DD", e[e.DESC = 23] = "DESC", e[e.DETAILS = 24] = "DETAILS", e[e.DIALOG = 25] = "DIALOG", e[e.DIR = 26] = "DIR", e[e.DIV = 27] = "DIV", e[e.DL = 28] = "DL", e[e.DT = 29] = "DT", e[e.EM = 30] = "EM", e[e.EMBED = 31] = "EMBED", e[e.FIELDSET = 32] = "FIELDSET", e[e.FIGCAPTION = 33] = "FIGCAPTION", e[e.FIGURE = 34] = "FIGURE", e[e.FONT = 35] = "FONT", e[e.FOOTER = 36] = "FOOTER", e[e.FOREIGN_OBJECT = 37] = "FOREIGN_OBJECT", e[e.FORM = 38] = "FORM", e[e.FRAME = 39] = "FRAME", e[e.FRAMESET = 40] = "FRAMESET", e[e.H1 = 41] = "H1", e[e.H2 = 42] = "H2", e[e.H3 = 43] = "H3", e[e.H4 = 44] = "H4", e[e.H5 = 45] = "H5", e[e.H6 = 46] = "H6", e[e.HEAD = 47] = "HEAD", e[e.HEADER = 48] = "HEADER", e[e.HGROUP = 49] = "HGROUP", e[e.HR = 50] = "HR", e[e.HTML = 51] = "HTML", e[e.I = 52] = "I", e[e.IMG = 53] = "IMG", e[e.IMAGE = 54] = "IMAGE", e[e.INPUT = 55] = "INPUT", e[e.IFRAME = 56] = "IFRAME", e[e.KEYGEN = 57] = "KEYGEN", e[e.LABEL = 58] = "LABEL", e[e.LI = 59] = "LI", e[e.LINK = 60] = "LINK", e[e.LISTING = 61] = "LISTING", e[e.MAIN = 62] = "MAIN", e[e.MALIGNMARK = 63] = "MALIGNMARK", e[e.MARQUEE = 64] = "MARQUEE", e[e.MATH = 65] = "MATH", e[e.MENU = 66] = "MENU", e[e.META = 67] = "META", e[e.MGLYPH = 68] = "MGLYPH", e[e.MI = 69] = "MI", e[e.MO = 70] = "MO", e[e.MN = 71] = "MN", e[e.MS = 72] = "MS", e[e.MTEXT = 73] = "MTEXT", e[e.NAV = 74] = "NAV", e[e.NOBR = 75] = "NOBR", e[e.NOFRAMES = 76] = "NOFRAMES", e[e.NOEMBED = 77] = "NOEMBED", e[e.NOSCRIPT = 78] = "NOSCRIPT", e[e.OBJECT = 79] = "OBJECT", e[e.OL = 80] = "OL", e[e.OPTGROUP = 81] = "OPTGROUP", e[e.OPTION = 82] = "OPTION", e[e.P = 83] = "P", e[e.PARAM = 84] = "PARAM", e[e.PLAINTEXT = 85] = "PLAINTEXT", e[e.PRE = 86] = "PRE", e[e.RB = 87] = "RB", e[e.RP = 88] = "RP", e[e.RT = 89] = "RT", e[e.RTC = 90] = "RTC", e[e.RUBY = 91] = "RUBY", e[e.S = 92] = "S", e[e.SCRIPT = 93] = "SCRIPT", e[e.SEARCH = 94] = "SEARCH", e[e.SECTION = 95] = "SECTION", e[e.SELECT = 96] = "SELECT", e[e.SOURCE = 97] = "SOURCE", e[e.SMALL = 98] = "SMALL", e[e.SPAN = 99] = "SPAN", e[e.STRIKE = 100] = "STRIKE", e[e.STRONG = 101] = "STRONG", e[e.STYLE = 102] = "STYLE", e[e.SUB = 103] = "SUB", e[e.SUMMARY = 104] = "SUMMARY", e[e.SUP = 105] = "SUP", e[e.TABLE = 106] = "TABLE", e[e.TBODY = 107] = "TBODY", e[e.TEMPLATE = 108] = "TEMPLATE", e[e.TEXTAREA = 109] = "TEXTAREA", e[e.TFOOT = 110] = "TFOOT", e[e.TD = 111] = "TD", e[e.TH = 112] = "TH", e[e.THEAD = 113] = "THEAD", e[e.TITLE = 114] = "TITLE", e[e.TR = 115] = "TR", e[e.TRACK = 116] = "TRACK", e[e.TT = 117] = "TT", e[e.U = 118] = "U", e[e.UL = 119] = "UL", e[e.SVG = 120] = "SVG", e[e.VAR = 121] = "VAR", e[e.WBR = 122] = "WBR", e[e.XMP = 123] = "XMP";
})(D ||= {});
var Xe = /* @__PURE__ */ new Map([
	[E.A, D.A],
	[E.ADDRESS, D.ADDRESS],
	[E.ANNOTATION_XML, D.ANNOTATION_XML],
	[E.APPLET, D.APPLET],
	[E.AREA, D.AREA],
	[E.ARTICLE, D.ARTICLE],
	[E.ASIDE, D.ASIDE],
	[E.B, D.B],
	[E.BASE, D.BASE],
	[E.BASEFONT, D.BASEFONT],
	[E.BGSOUND, D.BGSOUND],
	[E.BIG, D.BIG],
	[E.BLOCKQUOTE, D.BLOCKQUOTE],
	[E.BODY, D.BODY],
	[E.BR, D.BR],
	[E.BUTTON, D.BUTTON],
	[E.CAPTION, D.CAPTION],
	[E.CENTER, D.CENTER],
	[E.CODE, D.CODE],
	[E.COL, D.COL],
	[E.COLGROUP, D.COLGROUP],
	[E.DD, D.DD],
	[E.DESC, D.DESC],
	[E.DETAILS, D.DETAILS],
	[E.DIALOG, D.DIALOG],
	[E.DIR, D.DIR],
	[E.DIV, D.DIV],
	[E.DL, D.DL],
	[E.DT, D.DT],
	[E.EM, D.EM],
	[E.EMBED, D.EMBED],
	[E.FIELDSET, D.FIELDSET],
	[E.FIGCAPTION, D.FIGCAPTION],
	[E.FIGURE, D.FIGURE],
	[E.FONT, D.FONT],
	[E.FOOTER, D.FOOTER],
	[E.FOREIGN_OBJECT, D.FOREIGN_OBJECT],
	[E.FORM, D.FORM],
	[E.FRAME, D.FRAME],
	[E.FRAMESET, D.FRAMESET],
	[E.H1, D.H1],
	[E.H2, D.H2],
	[E.H3, D.H3],
	[E.H4, D.H4],
	[E.H5, D.H5],
	[E.H6, D.H6],
	[E.HEAD, D.HEAD],
	[E.HEADER, D.HEADER],
	[E.HGROUP, D.HGROUP],
	[E.HR, D.HR],
	[E.HTML, D.HTML],
	[E.I, D.I],
	[E.IMG, D.IMG],
	[E.IMAGE, D.IMAGE],
	[E.INPUT, D.INPUT],
	[E.IFRAME, D.IFRAME],
	[E.KEYGEN, D.KEYGEN],
	[E.LABEL, D.LABEL],
	[E.LI, D.LI],
	[E.LINK, D.LINK],
	[E.LISTING, D.LISTING],
	[E.MAIN, D.MAIN],
	[E.MALIGNMARK, D.MALIGNMARK],
	[E.MARQUEE, D.MARQUEE],
	[E.MATH, D.MATH],
	[E.MENU, D.MENU],
	[E.META, D.META],
	[E.MGLYPH, D.MGLYPH],
	[E.MI, D.MI],
	[E.MO, D.MO],
	[E.MN, D.MN],
	[E.MS, D.MS],
	[E.MTEXT, D.MTEXT],
	[E.NAV, D.NAV],
	[E.NOBR, D.NOBR],
	[E.NOFRAMES, D.NOFRAMES],
	[E.NOEMBED, D.NOEMBED],
	[E.NOSCRIPT, D.NOSCRIPT],
	[E.OBJECT, D.OBJECT],
	[E.OL, D.OL],
	[E.OPTGROUP, D.OPTGROUP],
	[E.OPTION, D.OPTION],
	[E.P, D.P],
	[E.PARAM, D.PARAM],
	[E.PLAINTEXT, D.PLAINTEXT],
	[E.PRE, D.PRE],
	[E.RB, D.RB],
	[E.RP, D.RP],
	[E.RT, D.RT],
	[E.RTC, D.RTC],
	[E.RUBY, D.RUBY],
	[E.S, D.S],
	[E.SCRIPT, D.SCRIPT],
	[E.SEARCH, D.SEARCH],
	[E.SECTION, D.SECTION],
	[E.SELECT, D.SELECT],
	[E.SOURCE, D.SOURCE],
	[E.SMALL, D.SMALL],
	[E.SPAN, D.SPAN],
	[E.STRIKE, D.STRIKE],
	[E.STRONG, D.STRONG],
	[E.STYLE, D.STYLE],
	[E.SUB, D.SUB],
	[E.SUMMARY, D.SUMMARY],
	[E.SUP, D.SUP],
	[E.TABLE, D.TABLE],
	[E.TBODY, D.TBODY],
	[E.TEMPLATE, D.TEMPLATE],
	[E.TEXTAREA, D.TEXTAREA],
	[E.TFOOT, D.TFOOT],
	[E.TD, D.TD],
	[E.TH, D.TH],
	[E.THEAD, D.THEAD],
	[E.TITLE, D.TITLE],
	[E.TR, D.TR],
	[E.TRACK, D.TRACK],
	[E.TT, D.TT],
	[E.U, D.U],
	[E.UL, D.UL],
	[E.SVG, D.SVG],
	[E.VAR, D.VAR],
	[E.WBR, D.WBR],
	[E.XMP, D.XMP]
]);
function O(e) {
	return Xe.get(e) ?? D.UNKNOWN;
}
var k = D, Ze = {
	[C.HTML]: /* @__PURE__ */ new Set([
		k.ADDRESS,
		k.APPLET,
		k.AREA,
		k.ARTICLE,
		k.ASIDE,
		k.BASE,
		k.BASEFONT,
		k.BGSOUND,
		k.BLOCKQUOTE,
		k.BODY,
		k.BR,
		k.BUTTON,
		k.CAPTION,
		k.CENTER,
		k.COL,
		k.COLGROUP,
		k.DD,
		k.DETAILS,
		k.DIR,
		k.DIV,
		k.DL,
		k.DT,
		k.EMBED,
		k.FIELDSET,
		k.FIGCAPTION,
		k.FIGURE,
		k.FOOTER,
		k.FORM,
		k.FRAME,
		k.FRAMESET,
		k.H1,
		k.H2,
		k.H3,
		k.H4,
		k.H5,
		k.H6,
		k.HEAD,
		k.HEADER,
		k.HGROUP,
		k.HR,
		k.HTML,
		k.IFRAME,
		k.IMG,
		k.INPUT,
		k.LI,
		k.LINK,
		k.LISTING,
		k.MAIN,
		k.MARQUEE,
		k.MENU,
		k.META,
		k.NAV,
		k.NOEMBED,
		k.NOFRAMES,
		k.NOSCRIPT,
		k.OBJECT,
		k.OL,
		k.P,
		k.PARAM,
		k.PLAINTEXT,
		k.PRE,
		k.SCRIPT,
		k.SECTION,
		k.SELECT,
		k.SOURCE,
		k.STYLE,
		k.SUMMARY,
		k.TABLE,
		k.TBODY,
		k.TD,
		k.TEMPLATE,
		k.TEXTAREA,
		k.TFOOT,
		k.TH,
		k.THEAD,
		k.TITLE,
		k.TR,
		k.TRACK,
		k.UL,
		k.WBR,
		k.XMP
	]),
	[C.MATHML]: /* @__PURE__ */ new Set([
		k.MI,
		k.MO,
		k.MN,
		k.MS,
		k.MTEXT,
		k.ANNOTATION_XML
	]),
	[C.SVG]: /* @__PURE__ */ new Set([
		k.TITLE,
		k.FOREIGN_OBJECT,
		k.DESC
	]),
	[C.XLINK]: /* @__PURE__ */ new Set(),
	[C.XML]: /* @__PURE__ */ new Set(),
	[C.XMLNS]: /* @__PURE__ */ new Set()
}, Qe = /* @__PURE__ */ new Set([
	k.H1,
	k.H2,
	k.H3,
	k.H4,
	k.H5,
	k.H6
]);
E.STYLE, E.SCRIPT, E.XMP, E.IFRAME, E.NOEMBED, E.NOFRAMES, E.PLAINTEXT;
// node_modules/parse5/dist/tokenizer/index.js
var $e = 64, A;
(function(e) {
	e[e.DATA = 0] = "DATA", e[e.RCDATA = 1] = "RCDATA", e[e.RAWTEXT = 2] = "RAWTEXT", e[e.SCRIPT_DATA = 3] = "SCRIPT_DATA", e[e.PLAINTEXT = 4] = "PLAINTEXT", e[e.TAG_OPEN = 5] = "TAG_OPEN", e[e.END_TAG_OPEN = 6] = "END_TAG_OPEN", e[e.TAG_NAME = 7] = "TAG_NAME", e[e.RCDATA_LESS_THAN_SIGN = 8] = "RCDATA_LESS_THAN_SIGN", e[e.RCDATA_END_TAG_OPEN = 9] = "RCDATA_END_TAG_OPEN", e[e.RCDATA_END_TAG_NAME = 10] = "RCDATA_END_TAG_NAME", e[e.RAWTEXT_LESS_THAN_SIGN = 11] = "RAWTEXT_LESS_THAN_SIGN", e[e.RAWTEXT_END_TAG_OPEN = 12] = "RAWTEXT_END_TAG_OPEN", e[e.RAWTEXT_END_TAG_NAME = 13] = "RAWTEXT_END_TAG_NAME", e[e.SCRIPT_DATA_LESS_THAN_SIGN = 14] = "SCRIPT_DATA_LESS_THAN_SIGN", e[e.SCRIPT_DATA_END_TAG_OPEN = 15] = "SCRIPT_DATA_END_TAG_OPEN", e[e.SCRIPT_DATA_END_TAG_NAME = 16] = "SCRIPT_DATA_END_TAG_NAME", e[e.SCRIPT_DATA_ESCAPE_START = 17] = "SCRIPT_DATA_ESCAPE_START", e[e.SCRIPT_DATA_ESCAPE_START_DASH = 18] = "SCRIPT_DATA_ESCAPE_START_DASH", e[e.SCRIPT_DATA_ESCAPED = 19] = "SCRIPT_DATA_ESCAPED", e[e.SCRIPT_DATA_ESCAPED_DASH = 20] = "SCRIPT_DATA_ESCAPED_DASH", e[e.SCRIPT_DATA_ESCAPED_DASH_DASH = 21] = "SCRIPT_DATA_ESCAPED_DASH_DASH", e[e.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN = 22] = "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN", e[e.SCRIPT_DATA_ESCAPED_END_TAG_OPEN = 23] = "SCRIPT_DATA_ESCAPED_END_TAG_OPEN", e[e.SCRIPT_DATA_ESCAPED_END_TAG_NAME = 24] = "SCRIPT_DATA_ESCAPED_END_TAG_NAME", e[e.SCRIPT_DATA_DOUBLE_ESCAPE_START = 25] = "SCRIPT_DATA_DOUBLE_ESCAPE_START", e[e.SCRIPT_DATA_DOUBLE_ESCAPED = 26] = "SCRIPT_DATA_DOUBLE_ESCAPED", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH = 27] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH = 28] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN = 29] = "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN", e[e.SCRIPT_DATA_DOUBLE_ESCAPE_END = 30] = "SCRIPT_DATA_DOUBLE_ESCAPE_END", e[e.BEFORE_ATTRIBUTE_NAME = 31] = "BEFORE_ATTRIBUTE_NAME", e[e.ATTRIBUTE_NAME = 32] = "ATTRIBUTE_NAME", e[e.AFTER_ATTRIBUTE_NAME = 33] = "AFTER_ATTRIBUTE_NAME", e[e.BEFORE_ATTRIBUTE_VALUE = 34] = "BEFORE_ATTRIBUTE_VALUE", e[e.ATTRIBUTE_VALUE_DOUBLE_QUOTED = 35] = "ATTRIBUTE_VALUE_DOUBLE_QUOTED", e[e.ATTRIBUTE_VALUE_SINGLE_QUOTED = 36] = "ATTRIBUTE_VALUE_SINGLE_QUOTED", e[e.ATTRIBUTE_VALUE_UNQUOTED = 37] = "ATTRIBUTE_VALUE_UNQUOTED", e[e.AFTER_ATTRIBUTE_VALUE_QUOTED = 38] = "AFTER_ATTRIBUTE_VALUE_QUOTED", e[e.SELF_CLOSING_START_TAG = 39] = "SELF_CLOSING_START_TAG", e[e.BOGUS_COMMENT = 40] = "BOGUS_COMMENT", e[e.MARKUP_DECLARATION_OPEN = 41] = "MARKUP_DECLARATION_OPEN", e[e.COMMENT_START = 42] = "COMMENT_START", e[e.COMMENT_START_DASH = 43] = "COMMENT_START_DASH", e[e.COMMENT = 44] = "COMMENT", e[e.COMMENT_LESS_THAN_SIGN = 45] = "COMMENT_LESS_THAN_SIGN", e[e.COMMENT_LESS_THAN_SIGN_BANG = 46] = "COMMENT_LESS_THAN_SIGN_BANG", e[e.COMMENT_LESS_THAN_SIGN_BANG_DASH = 47] = "COMMENT_LESS_THAN_SIGN_BANG_DASH", e[e.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH = 48] = "COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH", e[e.COMMENT_END_DASH = 49] = "COMMENT_END_DASH", e[e.COMMENT_END = 50] = "COMMENT_END", e[e.COMMENT_END_BANG = 51] = "COMMENT_END_BANG", e[e.DOCTYPE = 52] = "DOCTYPE", e[e.BEFORE_DOCTYPE_NAME = 53] = "BEFORE_DOCTYPE_NAME", e[e.DOCTYPE_NAME = 54] = "DOCTYPE_NAME", e[e.AFTER_DOCTYPE_NAME = 55] = "AFTER_DOCTYPE_NAME", e[e.AFTER_DOCTYPE_PUBLIC_KEYWORD = 56] = "AFTER_DOCTYPE_PUBLIC_KEYWORD", e[e.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER = 57] = "BEFORE_DOCTYPE_PUBLIC_IDENTIFIER", e[e.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED = 58] = "DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED", e[e.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED = 59] = "DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED", e[e.AFTER_DOCTYPE_PUBLIC_IDENTIFIER = 60] = "AFTER_DOCTYPE_PUBLIC_IDENTIFIER", e[e.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS = 61] = "BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS", e[e.AFTER_DOCTYPE_SYSTEM_KEYWORD = 62] = "AFTER_DOCTYPE_SYSTEM_KEYWORD", e[e.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER = 63] = "BEFORE_DOCTYPE_SYSTEM_IDENTIFIER", e[e.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED = 64] = "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED", e[e.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED = 65] = "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED", e[e.AFTER_DOCTYPE_SYSTEM_IDENTIFIER = 66] = "AFTER_DOCTYPE_SYSTEM_IDENTIFIER", e[e.BOGUS_DOCTYPE = 67] = "BOGUS_DOCTYPE", e[e.CDATA_SECTION = 68] = "CDATA_SECTION", e[e.CDATA_SECTION_BRACKET = 69] = "CDATA_SECTION_BRACKET", e[e.CDATA_SECTION_END = 70] = "CDATA_SECTION_END", e[e.CHARACTER_REFERENCE = 71] = "CHARACTER_REFERENCE", e[e.AMBIGUOUS_AMPERSAND = 72] = "AMBIGUOUS_AMPERSAND";
})(A ||= {});
var j = {
	DATA: A.DATA,
	RCDATA: A.RCDATA,
	RAWTEXT: A.RAWTEXT,
	SCRIPT_DATA: A.SCRIPT_DATA,
	PLAINTEXT: A.PLAINTEXT,
	CDATA_SECTION: A.CDATA_SECTION
};
function et(e) {
	return e >= t.DIGIT_0 && e <= t.DIGIT_9;
}
function M(e) {
	return e >= t.LATIN_CAPITAL_A && e <= t.LATIN_CAPITAL_Z;
}
function tt(e) {
	return e >= t.LATIN_SMALL_A && e <= t.LATIN_SMALL_Z;
}
function N(e) {
	return tt(e) || M(e);
}
function nt(e) {
	return N(e) || et(e);
}
function rt(e) {
	return e + 32;
}
function it(e) {
	return e === t.SPACE || e === t.LINE_FEED || e === t.TABULATION || e === t.FORM_FEED || e === t.CARRIAGE_RETURN;
}
function at(e) {
	return it(e) || e === t.SOLIDUS || e === t.GREATER_THAN_SIGN;
}
function ot(e) {
	return e === t.NULL ? c.nullCharacterReference : e > 1114111 ? c.characterReferenceOutsideUnicodeRange : r(e) ? c.surrogateCharacterReference : s(e) ? c.noncharacterCharacterReference : o(e) || e === t.CARRIAGE_RETURN ? c.controlCharacterReference : null;
}
var st = class {
	constructor(e, n) {
		this.options = e, this.handler = n, this.paused = !1, this.inLoop = !1, this.inForeignNode = !1, this.lastStartTagName = "", this.active = !1, this.state = A.DATA, this.returnState = A.DATA, this.entityStartPos = 0, this.consumedAfterSnapshot = -1, this.currentCharacterToken = null, this.currentToken = null, this.currentAttr = {
			name: "",
			value: ""
		}, this.currentAttrLocation = null, this.currentAttrNames = null, this.runStart = 0, this.runEnd = 0, this.preprocessor = new u(n), this.currentLocation = this.getCurrentLocation(-1), this.entityDecoder = new Ke((e, n) => {
			this.preprocessor.pos = this.entityStartPos + n - 1, this._isCharacterReferenceInAttribute() || this._ensureCharacterToken(it(e) ? d.WHITESPACE_CHARACTER : e === t.NULL ? d.NULL_CHARACTER : d.CHARACTER), this._extendRunWith(String.fromCodePoint(e), 0), this.entityStartPos = this.preprocessor.pos - n + 1;
		}, n.onParseError ? {
			missingSemicolonAfterCharacterReference: () => {
				this._err(c.missingSemicolonAfterCharacterReference, 1);
			},
			absenceOfDigitsInNumericCharacterReference: (e) => {
				this._err(c.absenceOfDigitsInNumericCharacterReference, this.entityStartPos - this.preprocessor.pos + e);
			},
			validateNumericCharacterReference: (e) => {
				let t = ot(e);
				t && this._err(t, 1);
			}
		} : void 0);
	}
	_err(e, t = 0) {
		var n, r;
		(r = (n = this.handler).onParseError) == null || r.call(n, this.preprocessor.getError(e, t));
	}
	getCurrentLocation(e) {
		return this.options.sourceCodeLocationInfo ? {
			startLine: this.preprocessor.line,
			startCol: this.preprocessor.col - e,
			startOffset: this.preprocessor.offset - e,
			endLine: -1,
			endCol: -1,
			endOffset: -1
		} : null;
	}
	_runParsingLoop() {
		if (!this.inLoop) {
			for (this.inLoop = !0; this.active && !this.paused;) {
				this.consumedAfterSnapshot = 0;
				let e = this._consume();
				this._ensureHibernation() || this._callState(e);
			}
			this.inLoop = !1;
		}
	}
	flushCharacters() {
		if (this.inLoop) throw Error("Cannot flush characters from a tokenizer callback");
		let e = this.currentCharacterToken?.location, t = null;
		e && (t = this.getCharacterTokenEndLocation(e), this.currentLocation = t), this.inLoop = !0;
		try {
			this._emitCurrentCharacterToken(t);
		} finally {
			this.inLoop = !1;
		}
		this._runParsingLoop();
	}
	getCharacterTokenEndLocation(e) {
		let n = this.getCharacterTokenEndOffset(), r = this.preprocessor.html.slice(e.startOffset - this.preprocessor.droppedBufferSize, n - this.preprocessor.droppedBufferSize), i = e.startLine, a = -1;
		for (let e = r.indexOf("\n"); e !== -1; e = r.indexOf("\n", e + 1)) i++, a = e;
		for (let e = r.indexOf("\r"); e !== -1; e = r.indexOf("\r", e + 1)) r.charCodeAt(e + 1) !== t.LINE_FEED && (i++, a = Math.max(a, e));
		return {
			startLine: i,
			startCol: a === -1 ? e.startCol + r.length : r.length - a,
			startOffset: n,
			endLine: -1,
			endCol: -1,
			endOffset: -1
		};
	}
	getCharacterTokenEndOffset() {
		let e = this.preprocessor.droppedBufferSize + this.preprocessor.pos + 1, t = this.currentToken?.location;
		switch (this.state) {
			case A.TAG_OPEN:
			case A.RCDATA_LESS_THAN_SIGN:
			case A.RAWTEXT_LESS_THAN_SIGN:
			case A.SCRIPT_DATA_LESS_THAN_SIGN:
			case A.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN:
			case A.CDATA_SECTION_BRACKET: return e - 1;
			case A.END_TAG_OPEN:
			case A.MARKUP_DECLARATION_OPEN:
			case A.RCDATA_END_TAG_OPEN:
			case A.RCDATA_END_TAG_NAME:
			case A.RAWTEXT_END_TAG_OPEN:
			case A.RAWTEXT_END_TAG_NAME:
			case A.SCRIPT_DATA_END_TAG_OPEN:
			case A.SCRIPT_DATA_END_TAG_NAME:
			case A.SCRIPT_DATA_ESCAPED_END_TAG_OPEN:
			case A.SCRIPT_DATA_ESCAPED_END_TAG_NAME:
			case A.CDATA_SECTION_END: return e - 2;
			case A.CHARACTER_REFERENCE: return this._isCharacterReferenceInAttribute() && t ? t.startOffset : this.preprocessor.droppedBufferSize + this.entityStartPos;
			case A.DOCTYPE:
			case A.BEFORE_DOCTYPE_NAME: return this.currentLocation.startOffset;
			default: return t && (this.state === A.TAG_NAME || this.state >= A.BEFORE_ATTRIBUTE_NAME && this.state <= A.BOGUS_COMMENT || this.state >= A.COMMENT_START && this.state <= A.BOGUS_DOCTYPE) ? t.startOffset : e;
		}
	}
	pause() {
		this.paused = !0;
	}
	resume(e) {
		if (!this.paused) throw Error("Parser was already resumed");
		this.paused = !1, this.inLoop || (this._runParsingLoop(), this.paused || e?.());
	}
	write(e, t, n) {
		this.active = !0, this.preprocessor.write(e, t), this._runParsingLoop(), this.paused || n?.();
	}
	insertHtmlAtCurrentPos(e) {
		this.active = !0, this.preprocessor.insertHtmlAtCurrentPos(e), this._runParsingLoop();
	}
	flushCurrentCharacterToken() {
		if (this.paused || this.active || !this.currentCharacterToken || this.currentToken || this.state === A.DOCTYPE || this.state === A.BEFORE_DOCTYPE_NAME || !this.preprocessor.willDropParsedChunk()) return;
		let e = this.preprocessor.droppedBufferSize + this.preprocessor.pos + 1 - this.getCharacterTokenEndOffset();
		this.preprocessor.advance(), this.currentLocation = this.getCurrentLocation(e), this.preprocessor.retreat(1), this._emitCurrentCharacterToken(this.currentLocation), this._createCharacterToken(d.CHARACTER), this.preprocessor.dropParsedChunk(Math.max(e - 1, 0)), this.entityStartPos = this.preprocessor.pos + 1 - e;
	}
	_ensureHibernation() {
		return this.preprocessor.endOfChunkHit ? (this.preprocessor.retreat(this.consumedAfterSnapshot), this.consumedAfterSnapshot = 0, this.active = !1, !0) : !1;
	}
	_consume() {
		return this.consumedAfterSnapshot++, this.preprocessor.advance();
	}
	_advanceBy(e) {
		this.consumedAfterSnapshot += e;
		for (let t = 0; t < e; t++) this.preprocessor.advance();
	}
	_consumeSequenceIfMatch(e, t) {
		return this.preprocessor.startsWith(e, t) ? (this._advanceBy(e.length - 1), !0) : !1;
	}
	_createStartTagToken() {
		this._flushRun(""), this.currentToken = {
			type: d.START_TAG,
			tagName: "",
			tagID: D.UNKNOWN,
			selfClosing: !1,
			ackSelfClosing: !1,
			attrs: [],
			location: this.getCurrentLocation(1)
		};
	}
	_createEndTagToken() {
		this._flushRun(""), this.currentToken = {
			type: d.END_TAG,
			tagName: "",
			tagID: D.UNKNOWN,
			selfClosing: !1,
			ackSelfClosing: !1,
			attrs: [],
			location: this.getCurrentLocation(2)
		};
	}
	_createCommentToken(e) {
		this._flushRun(""), this.currentToken = {
			type: d.COMMENT,
			data: "",
			location: this.getCurrentLocation(e)
		};
	}
	_createDoctypeToken(e) {
		this._flushRun(""), this.currentToken = {
			type: d.DOCTYPE,
			name: e,
			forceQuirks: !1,
			publicId: null,
			systemId: null,
			location: this.currentLocation
		};
	}
	_createCharacterToken(e) {
		if (this.currentLocation) {
			let e = this.currentLocation.startOffset - this.preprocessor.droppedBufferSize;
			this.preprocessor.html[e] === "\n" && this.preprocessor.html[e - 1] === "\r" && this.currentLocation.startOffset++;
		}
		this.currentCharacterToken = {
			type: e,
			chars: "",
			location: this.currentLocation
		};
	}
	_createAttr(e) {
		this._flushRun(""), this.currentAttr = {
			name: e,
			value: ""
		}, this.currentAttrLocation = this.getCurrentLocation(0);
	}
	_leaveAttrName() {
		var e;
		let t = this.currentToken, { name: n } = this.currentAttr, r = this.currentAttrNames, i;
		if (r === null ? (i = f(t, n) !== null, !i && t.attrs.length === $e && (this.currentAttrNames = new Set(t.attrs.map((e) => e.name)).add(n))) : (i = r.has(n), i || r.add(n)), i) this._err(c.duplicateAttribute);
		else if (t.attrs.push(this.currentAttr), t.location && this.currentAttrLocation) {
			let n = (e = t.location).attrs ?? (e.attrs = Object.create(null));
			n[this.currentAttr.name] = this.currentAttrLocation, this._leaveAttrValue();
		}
	}
	_leaveAttrValue() {
		this.currentAttrLocation && (this.currentAttrLocation.endLine = this.preprocessor.line, this.currentAttrLocation.endCol = this.preprocessor.col, this.currentAttrLocation.endOffset = this.preprocessor.offset);
	}
	_flushRun(e) {
		if (this.runEnd === this.runStart && e.length === 0) return;
		let t = this.preprocessor.html.slice(this.runStart, this.runEnd), n = (t.length < 13 ? t : ` ${t}`.slice(1)) + e, r = this.currentToken;
		this.runStart = this.runEnd, r === null ? this.currentCharacterToken.chars += n : r.type === d.COMMENT ? r.data += n : this.currentAttr.value += n;
	}
	_extendRun(e) {
		let { preprocessor: n } = this;
		if (e === t.LINE_FEED && n.html.charCodeAt(n.pos) !== t.LINE_FEED) this._flushRun("\n"), this.runStart = n.pos + 1;
		else {
			let t = n.pos - Number(e > 65535);
			t !== this.runEnd && (this._flushRun(""), this.runStart = t);
		}
		this.runEnd = n.pos + 1;
	}
	_extendRunWith(e, t) {
		let { preprocessor: n } = this, r = n.codePointStart + 1 + t - e.length;
		r >= 0 && n.html.startsWith(e, r) ? r !== this.runEnd && (this._flushRun(""), this.runStart = r) : (this._flushRun(e), this.runStart = r + e.length), this.runEnd = r + e.length;
	}
	prepareToken(e) {
		this._emitCurrentCharacterToken(e.location), this.currentToken = null, e.location && (e.location.endLine = this.preprocessor.line, e.location.endCol = this.preprocessor.col + 1, e.location.endOffset = this.preprocessor.offset + 1), this.currentLocation = this.getCurrentLocation(-1);
	}
	emitCurrentTagToken() {
		let e = this.currentToken;
		this.currentAttrNames = null, this.prepareToken(e), e.tagID = O(e.tagName), e.type === d.START_TAG ? (this.lastStartTagName = e.tagName, this.handler.onStartTag(e)) : (e.attrs.length > 0 && this._err(c.endTagWithAttributes), e.selfClosing && this._err(c.endTagWithTrailingSolidus), this.handler.onEndTag(e)), this.preprocessor.dropParsedChunk();
	}
	emitCurrentComment(e) {
		this.prepareToken(e), this.handler.onComment(e), this.preprocessor.dropParsedChunk();
	}
	emitCurrentDoctype(e) {
		this.prepareToken(e), this.handler.onDoctype(e), this.preprocessor.dropParsedChunk();
	}
	_emitCurrentCharacterToken(e) {
		if (this._flushRun(""), this.currentCharacterToken) {
			switch (e && this.currentCharacterToken.location && (this.currentCharacterToken.location.endLine = e.startLine, this.currentCharacterToken.location.endCol = e.startCol, this.currentCharacterToken.location.endOffset = e.startOffset), this.currentCharacterToken.type) {
				case d.CHARACTER:
					this.handler.onCharacter(this.currentCharacterToken);
					break;
				case d.NULL_CHARACTER:
					this.handler.onNullCharacter(this.currentCharacterToken);
					break;
				case d.WHITESPACE_CHARACTER: this.handler.onWhitespaceCharacter(this.currentCharacterToken);
			}
			this.currentCharacterToken = null;
		}
	}
	_emitEOFToken() {
		let e = this.getCurrentLocation(0);
		e && (e.endLine = e.startLine, e.endCol = e.startCol, e.endOffset = e.startOffset), this._emitCurrentCharacterToken(this.currentToken?.location ?? e), this.handler.onEof({
			type: d.EOF,
			location: e
		}), this.active = !1;
	}
	_ensureCharacterToken(e) {
		if (this.currentCharacterToken) {
			if (this.currentCharacterToken.type === e) return;
			this.currentLocation = this.getCurrentLocation(0), this._emitCurrentCharacterToken(this.currentLocation), this.preprocessor.dropParsedChunk();
		}
		this._createCharacterToken(e);
	}
	_emitCodePoint(e) {
		let n = it(e) ? d.WHITESPACE_CHARACTER : e === t.NULL ? d.NULL_CHARACTER : d.CHARACTER, r = this.currentCharacterToken;
		(r === null || r.type !== n) && this._ensureCharacterToken(n), this._extendRun(e);
	}
	_emitChars(e, t = 0) {
		this.options.sourceCodeLocationInfo && t !== 0 && this.currentCharacterToken && this.currentCharacterToken.type !== d.CHARACTER ? (this.currentLocation = this.getCurrentLocation(e.length - 1 - t), this._emitCurrentCharacterToken(this.currentLocation), this._createCharacterToken(d.CHARACTER)) : this._ensureCharacterToken(d.CHARACTER), this._extendRunWith(e, t);
	}
	_startCharacterReference() {
		this.returnState = this.state, this.state = A.CHARACTER_REFERENCE, this.entityStartPos = this.preprocessor.pos, this.entityDecoder.startEntity(this._isCharacterReferenceInAttribute() ? b.Attribute : b.Legacy);
	}
	_isCharacterReferenceInAttribute() {
		return this.returnState === A.ATTRIBUTE_VALUE_DOUBLE_QUOTED || this.returnState === A.ATTRIBUTE_VALUE_SINGLE_QUOTED || this.returnState === A.ATTRIBUTE_VALUE_UNQUOTED;
	}
	_flushCodePointConsumedAsCharacterReference(e) {
		this._isCharacterReferenceInAttribute() ? this._extendRun(e) : this._emitCodePoint(e);
	}
	_callState(e) {
		switch (this.state) {
			case A.DATA:
				this._stateData(e);
				break;
			case A.RCDATA:
				this._stateRcdata(e);
				break;
			case A.RAWTEXT:
				this._stateRawtext(e);
				break;
			case A.SCRIPT_DATA:
				this._stateScriptData(e);
				break;
			case A.PLAINTEXT:
				this._statePlaintext(e);
				break;
			case A.TAG_OPEN:
				this._stateTagOpen(e);
				break;
			case A.END_TAG_OPEN:
				this._stateEndTagOpen(e);
				break;
			case A.TAG_NAME:
				this._stateTagName(e);
				break;
			case A.RCDATA_LESS_THAN_SIGN:
				this._stateRcdataLessThanSign(e);
				break;
			case A.RCDATA_END_TAG_OPEN:
				this._stateRcdataEndTagOpen(e);
				break;
			case A.RCDATA_END_TAG_NAME:
				this._stateRcdataEndTagName(e);
				break;
			case A.RAWTEXT_LESS_THAN_SIGN:
				this._stateRawtextLessThanSign(e);
				break;
			case A.RAWTEXT_END_TAG_OPEN:
				this._stateRawtextEndTagOpen(e);
				break;
			case A.RAWTEXT_END_TAG_NAME:
				this._stateRawtextEndTagName(e);
				break;
			case A.SCRIPT_DATA_LESS_THAN_SIGN:
				this._stateScriptDataLessThanSign(e);
				break;
			case A.SCRIPT_DATA_END_TAG_OPEN:
				this._stateScriptDataEndTagOpen(e);
				break;
			case A.SCRIPT_DATA_END_TAG_NAME:
				this._stateScriptDataEndTagName(e);
				break;
			case A.SCRIPT_DATA_ESCAPE_START:
				this._stateScriptDataEscapeStart(e);
				break;
			case A.SCRIPT_DATA_ESCAPE_START_DASH:
				this._stateScriptDataEscapeStartDash(e);
				break;
			case A.SCRIPT_DATA_ESCAPED:
				this._stateScriptDataEscaped(e);
				break;
			case A.SCRIPT_DATA_ESCAPED_DASH:
				this._stateScriptDataEscapedDash(e);
				break;
			case A.SCRIPT_DATA_ESCAPED_DASH_DASH:
				this._stateScriptDataEscapedDashDash(e);
				break;
			case A.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN:
				this._stateScriptDataEscapedLessThanSign(e);
				break;
			case A.SCRIPT_DATA_ESCAPED_END_TAG_OPEN:
				this._stateScriptDataEscapedEndTagOpen(e);
				break;
			case A.SCRIPT_DATA_ESCAPED_END_TAG_NAME:
				this._stateScriptDataEscapedEndTagName(e);
				break;
			case A.SCRIPT_DATA_DOUBLE_ESCAPE_START:
				this._stateScriptDataDoubleEscapeStart(e);
				break;
			case A.SCRIPT_DATA_DOUBLE_ESCAPED:
				this._stateScriptDataDoubleEscaped(e);
				break;
			case A.SCRIPT_DATA_DOUBLE_ESCAPED_DASH:
				this._stateScriptDataDoubleEscapedDash(e);
				break;
			case A.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH:
				this._stateScriptDataDoubleEscapedDashDash(e);
				break;
			case A.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN:
				this._stateScriptDataDoubleEscapedLessThanSign(e);
				break;
			case A.SCRIPT_DATA_DOUBLE_ESCAPE_END:
				this._stateScriptDataDoubleEscapeEnd(e);
				break;
			case A.BEFORE_ATTRIBUTE_NAME:
				this._stateBeforeAttributeName(e);
				break;
			case A.ATTRIBUTE_NAME:
				this._stateAttributeName(e);
				break;
			case A.AFTER_ATTRIBUTE_NAME:
				this._stateAfterAttributeName(e);
				break;
			case A.BEFORE_ATTRIBUTE_VALUE:
				this._stateBeforeAttributeValue(e);
				break;
			case A.ATTRIBUTE_VALUE_DOUBLE_QUOTED:
				this._stateAttributeValueDoubleQuoted(e);
				break;
			case A.ATTRIBUTE_VALUE_SINGLE_QUOTED:
				this._stateAttributeValueSingleQuoted(e);
				break;
			case A.ATTRIBUTE_VALUE_UNQUOTED:
				this._stateAttributeValueUnquoted(e);
				break;
			case A.AFTER_ATTRIBUTE_VALUE_QUOTED:
				this._stateAfterAttributeValueQuoted(e);
				break;
			case A.SELF_CLOSING_START_TAG:
				this._stateSelfClosingStartTag(e);
				break;
			case A.BOGUS_COMMENT:
				this._stateBogusComment(e);
				break;
			case A.MARKUP_DECLARATION_OPEN:
				this._stateMarkupDeclarationOpen(e);
				break;
			case A.COMMENT_START:
				this._stateCommentStart(e);
				break;
			case A.COMMENT_START_DASH:
				this._stateCommentStartDash(e);
				break;
			case A.COMMENT:
				this._stateComment(e);
				break;
			case A.COMMENT_LESS_THAN_SIGN:
				this._stateCommentLessThanSign(e);
				break;
			case A.COMMENT_LESS_THAN_SIGN_BANG:
				this._stateCommentLessThanSignBang(e);
				break;
			case A.COMMENT_LESS_THAN_SIGN_BANG_DASH:
				this._stateCommentLessThanSignBangDash(e);
				break;
			case A.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH:
				this._stateCommentLessThanSignBangDashDash(e);
				break;
			case A.COMMENT_END_DASH:
				this._stateCommentEndDash(e);
				break;
			case A.COMMENT_END:
				this._stateCommentEnd(e);
				break;
			case A.COMMENT_END_BANG:
				this._stateCommentEndBang(e);
				break;
			case A.DOCTYPE:
				this._stateDoctype(e);
				break;
			case A.BEFORE_DOCTYPE_NAME:
				this._stateBeforeDoctypeName(e);
				break;
			case A.DOCTYPE_NAME:
				this._stateDoctypeName(e);
				break;
			case A.AFTER_DOCTYPE_NAME:
				this._stateAfterDoctypeName(e);
				break;
			case A.AFTER_DOCTYPE_PUBLIC_KEYWORD:
				this._stateAfterDoctypePublicKeyword(e);
				break;
			case A.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER:
				this._stateBeforeDoctypePublicIdentifier(e);
				break;
			case A.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED:
				this._stateDoctypePublicIdentifierDoubleQuoted(e);
				break;
			case A.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED:
				this._stateDoctypePublicIdentifierSingleQuoted(e);
				break;
			case A.AFTER_DOCTYPE_PUBLIC_IDENTIFIER:
				this._stateAfterDoctypePublicIdentifier(e);
				break;
			case A.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS:
				this._stateBetweenDoctypePublicAndSystemIdentifiers(e);
				break;
			case A.AFTER_DOCTYPE_SYSTEM_KEYWORD:
				this._stateAfterDoctypeSystemKeyword(e);
				break;
			case A.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER:
				this._stateBeforeDoctypeSystemIdentifier(e);
				break;
			case A.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED:
				this._stateDoctypeSystemIdentifierDoubleQuoted(e);
				break;
			case A.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED:
				this._stateDoctypeSystemIdentifierSingleQuoted(e);
				break;
			case A.AFTER_DOCTYPE_SYSTEM_IDENTIFIER:
				this._stateAfterDoctypeSystemIdentifier(e);
				break;
			case A.BOGUS_DOCTYPE:
				this._stateBogusDoctype(e);
				break;
			case A.CDATA_SECTION:
				this._stateCdataSection(e);
				break;
			case A.CDATA_SECTION_BRACKET:
				this._stateCdataSectionBracket(e);
				break;
			case A.CDATA_SECTION_END:
				this._stateCdataSectionEnd(e);
				break;
			case A.CHARACTER_REFERENCE:
				this._stateCharacterReference();
				break;
			case A.AMBIGUOUS_AMPERSAND:
				this._stateAmbiguousAmpersand(e);
				break;
			default: throw Error("Unknown state");
		}
	}
	_stateData(e) {
		switch (e) {
			case t.LESS_THAN_SIGN:
				this.state = A.TAG_OPEN;
				break;
			case t.AMPERSAND:
				this._startCharacterReference();
				break;
			case t.NULL:
				this._err(c.unexpectedNullCharacter), this._emitCodePoint(e);
				break;
			case t.EOF:
				this._emitEOFToken();
				break;
			default: this._emitCodePoint(e);
		}
	}
	_stateRcdata(e) {
		switch (e) {
			case t.AMPERSAND:
				this._startCharacterReference();
				break;
			case t.LESS_THAN_SIGN:
				this.state = A.RCDATA_LESS_THAN_SIGN;
				break;
			case t.NULL:
				this._err(c.unexpectedNullCharacter), this._emitChars("�");
				break;
			case t.EOF:
				this._emitEOFToken();
				break;
			default: this._emitCodePoint(e);
		}
	}
	_stateRawtext(e) {
		switch (e) {
			case t.LESS_THAN_SIGN:
				this.state = A.RAWTEXT_LESS_THAN_SIGN;
				break;
			case t.NULL:
				this._err(c.unexpectedNullCharacter), this._emitChars("�");
				break;
			case t.EOF:
				this._emitEOFToken();
				break;
			default: this._emitCodePoint(e);
		}
	}
	_stateScriptData(e) {
		switch (e) {
			case t.LESS_THAN_SIGN:
				this.state = A.SCRIPT_DATA_LESS_THAN_SIGN;
				break;
			case t.NULL:
				this._err(c.unexpectedNullCharacter), this._emitChars("�");
				break;
			case t.EOF:
				this._emitEOFToken();
				break;
			default: this._emitCodePoint(e);
		}
	}
	_statePlaintext(e) {
		switch (e) {
			case t.NULL:
				this._err(c.unexpectedNullCharacter), this._emitChars("�");
				break;
			case t.EOF:
				this._emitEOFToken();
				break;
			default: this._emitCodePoint(e);
		}
	}
	_stateTagOpen(e) {
		if (N(e)) this._createStartTagToken(), this.state = A.TAG_NAME, this._stateTagName(e);
		else switch (e) {
			case t.EXCLAMATION_MARK:
				this.state = A.MARKUP_DECLARATION_OPEN;
				break;
			case t.SOLIDUS:
				this.state = A.END_TAG_OPEN;
				break;
			case t.QUESTION_MARK:
				this._err(c.unexpectedQuestionMarkInsteadOfTagName), this._createCommentToken(1), this.state = A.BOGUS_COMMENT, this._stateBogusComment(e);
				break;
			case t.EOF:
				this._err(c.eofBeforeTagName), this._emitChars("<", -1), this._emitEOFToken();
				break;
			default: this._err(c.invalidFirstCharacterOfTagName), this._emitChars("<", -1), this.state = A.DATA, this._stateData(e);
		}
	}
	_stateEndTagOpen(e) {
		if (N(e)) this._createEndTagToken(), this.state = A.TAG_NAME, this._stateTagName(e);
		else switch (e) {
			case t.GREATER_THAN_SIGN:
				this._err(c.missingEndTagName), this.state = A.DATA;
				break;
			case t.EOF:
				this._err(c.eofBeforeTagName), this._emitChars("</", -1), this._emitEOFToken();
				break;
			default: this._err(c.invalidFirstCharacterOfTagName), this._createCommentToken(2), this.state = A.BOGUS_COMMENT, this._stateBogusComment(e);
		}
	}
	_stateTagName(e) {
		let n = this.currentToken;
		switch (e) {
			case t.SPACE:
			case t.LINE_FEED:
			case t.TABULATION:
			case t.FORM_FEED:
				this.state = A.BEFORE_ATTRIBUTE_NAME;
				break;
			case t.SOLIDUS:
				this.state = A.SELF_CLOSING_START_TAG;
				break;
			case t.GREATER_THAN_SIGN:
				this.state = A.DATA, this.emitCurrentTagToken();
				break;
			case t.NULL:
				this._err(c.unexpectedNullCharacter), n.tagName += "�";
				break;
			case t.EOF:
				this._err(c.eofInTag), this._emitEOFToken();
				break;
			default: n.tagName += String.fromCodePoint(M(e) ? rt(e) : e);
		}
	}
	_stateRcdataLessThanSign(e) {
		e === t.SOLIDUS ? this.state = A.RCDATA_END_TAG_OPEN : (this._emitChars("<", -1), this.state = A.RCDATA, this._stateRcdata(e));
	}
	_stateRcdataEndTagOpen(e) {
		N(e) ? (this.state = A.RCDATA_END_TAG_NAME, this._stateRcdataEndTagName(e)) : (this._emitChars("</", -1), this.state = A.RCDATA, this._stateRcdata(e));
	}
	handleSpecialEndTag(e) {
		if (!this.preprocessor.startsWith(this.lastStartTagName, !1)) return !this._ensureHibernation();
		this._createEndTagToken();
		let n = this.currentToken;
		switch (n.tagName = this.lastStartTagName, this.preprocessor.peek(this.lastStartTagName.length)) {
			case t.SPACE:
			case t.LINE_FEED:
			case t.TABULATION:
			case t.FORM_FEED: return this._advanceBy(this.lastStartTagName.length), this.state = A.BEFORE_ATTRIBUTE_NAME, !1;
			case t.SOLIDUS: return this._advanceBy(this.lastStartTagName.length), this.state = A.SELF_CLOSING_START_TAG, !1;
			case t.GREATER_THAN_SIGN: return this._advanceBy(this.lastStartTagName.length), this.emitCurrentTagToken(), this.state = A.DATA, !1;
			default: return this.currentToken = null, !this._ensureHibernation();
		}
	}
	_stateRcdataEndTagName(e) {
		this.handleSpecialEndTag(e) && (this._emitChars("</", -1), this.state = A.RCDATA, this._stateRcdata(e));
	}
	_stateRawtextLessThanSign(e) {
		e === t.SOLIDUS ? this.state = A.RAWTEXT_END_TAG_OPEN : (this._emitChars("<", -1), this.state = A.RAWTEXT, this._stateRawtext(e));
	}
	_stateRawtextEndTagOpen(e) {
		N(e) ? (this.state = A.RAWTEXT_END_TAG_NAME, this._stateRawtextEndTagName(e)) : (this._emitChars("</", -1), this.state = A.RAWTEXT, this._stateRawtext(e));
	}
	_stateRawtextEndTagName(e) {
		this.handleSpecialEndTag(e) && (this._emitChars("</", -1), this.state = A.RAWTEXT, this._stateRawtext(e));
	}
	_stateScriptDataLessThanSign(e) {
		switch (e) {
			case t.SOLIDUS:
				this.state = A.SCRIPT_DATA_END_TAG_OPEN;
				break;
			case t.EXCLAMATION_MARK:
				this.state = A.SCRIPT_DATA_ESCAPE_START, this._emitChars("<!");
				break;
			default: this._emitChars("<", -1), this.state = A.SCRIPT_DATA, this._stateScriptData(e);
		}
	}
	_stateScriptDataEndTagOpen(e) {
		N(e) ? (this.state = A.SCRIPT_DATA_END_TAG_NAME, this._stateScriptDataEndTagName(e)) : (this._emitChars("</", -1), this.state = A.SCRIPT_DATA, this._stateScriptData(e));
	}
	_stateScriptDataEndTagName(e) {
		this.handleSpecialEndTag(e) && (this._emitChars("</", -1), this.state = A.SCRIPT_DATA, this._stateScriptData(e));
	}
	_stateScriptDataEscapeStart(e) {
		e === t.HYPHEN_MINUS ? (this.state = A.SCRIPT_DATA_ESCAPE_START_DASH, this._emitChars("-")) : (this.state = A.SCRIPT_DATA, this._stateScriptData(e));
	}
	_stateScriptDataEscapeStartDash(e) {
		e === t.HYPHEN_MINUS ? (this.state = A.SCRIPT_DATA_ESCAPED_DASH_DASH, this._emitChars("-")) : (this.state = A.SCRIPT_DATA, this._stateScriptData(e));
	}
	_stateScriptDataEscaped(e) {
		switch (e) {
			case t.HYPHEN_MINUS:
				this.state = A.SCRIPT_DATA_ESCAPED_DASH, this._emitChars("-");
				break;
			case t.LESS_THAN_SIGN:
				this.state = A.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
				break;
			case t.NULL:
				this._err(c.unexpectedNullCharacter), this._emitChars("�");
				break;
			case t.EOF:
				this._err(c.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
				break;
			default: this._emitCodePoint(e);
		}
	}
	_stateScriptDataEscapedDash(e) {
		switch (e) {
			case t.HYPHEN_MINUS:
				this.state = A.SCRIPT_DATA_ESCAPED_DASH_DASH, this._emitChars("-");
				break;
			case t.LESS_THAN_SIGN:
				this.state = A.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
				break;
			case t.NULL:
				this._err(c.unexpectedNullCharacter), this.state = A.SCRIPT_DATA_ESCAPED, this._emitChars("�");
				break;
			case t.EOF:
				this._err(c.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
				break;
			default: this.state = A.SCRIPT_DATA_ESCAPED, this._emitCodePoint(e);
		}
	}
	_stateScriptDataEscapedDashDash(e) {
		switch (e) {
			case t.HYPHEN_MINUS:
				this._emitChars("-");
				break;
			case t.LESS_THAN_SIGN:
				this.state = A.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
				break;
			case t.GREATER_THAN_SIGN:
				this.state = A.SCRIPT_DATA, this._emitChars(">");
				break;
			case t.NULL:
				this._err(c.unexpectedNullCharacter), this.state = A.SCRIPT_DATA_ESCAPED, this._emitChars("�");
				break;
			case t.EOF:
				this._err(c.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
				break;
			default: this.state = A.SCRIPT_DATA_ESCAPED, this._emitCodePoint(e);
		}
	}
	_stateScriptDataEscapedLessThanSign(e) {
		e === t.SOLIDUS ? this.state = A.SCRIPT_DATA_ESCAPED_END_TAG_OPEN : N(e) ? (this._emitChars("<", -1), this.state = A.SCRIPT_DATA_DOUBLE_ESCAPE_START, this._stateScriptDataDoubleEscapeStart(e)) : (this._emitChars("<", -1), this.state = A.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(e));
	}
	_stateScriptDataEscapedEndTagOpen(e) {
		N(e) ? (this.state = A.SCRIPT_DATA_ESCAPED_END_TAG_NAME, this._stateScriptDataEscapedEndTagName(e)) : (this._emitChars("</", -1), this.state = A.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(e));
	}
	_stateScriptDataEscapedEndTagName(e) {
		this.handleSpecialEndTag(e) && (this._emitChars("</", -1), this.state = A.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(e));
	}
	_stateScriptDataDoubleEscapeStart(e) {
		if (this.preprocessor.startsWith(n.SCRIPT, !1) && at(this.preprocessor.peek(n.SCRIPT.length))) {
			this._emitCodePoint(e);
			for (let e = 0; e < n.SCRIPT.length; e++) this._emitCodePoint(this._consume());
			this.state = A.SCRIPT_DATA_DOUBLE_ESCAPED;
		} else this._ensureHibernation() || (this.state = A.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(e));
	}
	_stateScriptDataDoubleEscaped(e) {
		switch (e) {
			case t.HYPHEN_MINUS:
				this.state = A.SCRIPT_DATA_DOUBLE_ESCAPED_DASH, this._emitChars("-");
				break;
			case t.LESS_THAN_SIGN:
				this.state = A.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
				break;
			case t.NULL:
				this._err(c.unexpectedNullCharacter), this._emitChars("�");
				break;
			case t.EOF:
				this._err(c.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
				break;
			default: this._emitCodePoint(e);
		}
	}
	_stateScriptDataDoubleEscapedDash(e) {
		switch (e) {
			case t.HYPHEN_MINUS:
				this.state = A.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH, this._emitChars("-");
				break;
			case t.LESS_THAN_SIGN:
				this.state = A.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
				break;
			case t.NULL:
				this._err(c.unexpectedNullCharacter), this.state = A.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitChars("�");
				break;
			case t.EOF:
				this._err(c.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
				break;
			default: this.state = A.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitCodePoint(e);
		}
	}
	_stateScriptDataDoubleEscapedDashDash(e) {
		switch (e) {
			case t.HYPHEN_MINUS:
				this._emitChars("-");
				break;
			case t.LESS_THAN_SIGN:
				this.state = A.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
				break;
			case t.GREATER_THAN_SIGN:
				this.state = A.SCRIPT_DATA, this._emitChars(">");
				break;
			case t.NULL:
				this._err(c.unexpectedNullCharacter), this.state = A.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitChars("�");
				break;
			case t.EOF:
				this._err(c.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
				break;
			default: this.state = A.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitCodePoint(e);
		}
	}
	_stateScriptDataDoubleEscapedLessThanSign(e) {
		e === t.SOLIDUS ? (this.state = A.SCRIPT_DATA_DOUBLE_ESCAPE_END, this._emitChars("/")) : (this.state = A.SCRIPT_DATA_DOUBLE_ESCAPED, this._stateScriptDataDoubleEscaped(e));
	}
	_stateScriptDataDoubleEscapeEnd(e) {
		if (this.preprocessor.startsWith(n.SCRIPT, !1) && at(this.preprocessor.peek(n.SCRIPT.length))) {
			this._emitCodePoint(e);
			for (let e = 0; e < n.SCRIPT.length; e++) this._emitCodePoint(this._consume());
			this.state = A.SCRIPT_DATA_ESCAPED;
		} else this._ensureHibernation() || (this.state = A.SCRIPT_DATA_DOUBLE_ESCAPED, this._stateScriptDataDoubleEscaped(e));
	}
	_stateBeforeAttributeName(e) {
		switch (e) {
			case t.SPACE:
			case t.LINE_FEED:
			case t.TABULATION:
			case t.FORM_FEED: break;
			case t.SOLIDUS:
			case t.GREATER_THAN_SIGN:
			case t.EOF:
				this.state = A.AFTER_ATTRIBUTE_NAME, this._stateAfterAttributeName(e);
				break;
			case t.EQUALS_SIGN:
				this._err(c.unexpectedEqualsSignBeforeAttributeName), this._createAttr("="), this.state = A.ATTRIBUTE_NAME;
				break;
			default: this._createAttr(""), this.state = A.ATTRIBUTE_NAME, this._stateAttributeName(e);
		}
	}
	_stateAttributeName(e) {
		switch (e) {
			case t.SPACE:
			case t.LINE_FEED:
			case t.TABULATION:
			case t.FORM_FEED:
			case t.SOLIDUS:
			case t.GREATER_THAN_SIGN:
			case t.EOF:
				this._leaveAttrName(), this.state = A.AFTER_ATTRIBUTE_NAME, this._stateAfterAttributeName(e);
				break;
			case t.EQUALS_SIGN:
				this._leaveAttrName(), this.state = A.BEFORE_ATTRIBUTE_VALUE;
				break;
			case t.QUOTATION_MARK:
			case t.APOSTROPHE:
			case t.LESS_THAN_SIGN:
				this._err(c.unexpectedCharacterInAttributeName), this.currentAttr.name += String.fromCodePoint(e);
				break;
			case t.NULL:
				this._err(c.unexpectedNullCharacter), this.currentAttr.name += "�";
				break;
			default: this.currentAttr.name += String.fromCodePoint(M(e) ? rt(e) : e);
		}
	}
	_stateAfterAttributeName(e) {
		switch (e) {
			case t.SPACE:
			case t.LINE_FEED:
			case t.TABULATION:
			case t.FORM_FEED: break;
			case t.SOLIDUS:
				this.state = A.SELF_CLOSING_START_TAG;
				break;
			case t.EQUALS_SIGN:
				this.state = A.BEFORE_ATTRIBUTE_VALUE;
				break;
			case t.GREATER_THAN_SIGN:
				this.state = A.DATA, this.emitCurrentTagToken();
				break;
			case t.EOF:
				this._err(c.eofInTag), this._emitEOFToken();
				break;
			default: this._createAttr(""), this.state = A.ATTRIBUTE_NAME, this._stateAttributeName(e);
		}
	}
	_stateBeforeAttributeValue(e) {
		switch (e) {
			case t.SPACE:
			case t.LINE_FEED:
			case t.TABULATION:
			case t.FORM_FEED: break;
			case t.QUOTATION_MARK:
				this.state = A.ATTRIBUTE_VALUE_DOUBLE_QUOTED;
				break;
			case t.APOSTROPHE:
				this.state = A.ATTRIBUTE_VALUE_SINGLE_QUOTED;
				break;
			case t.GREATER_THAN_SIGN:
				this._err(c.missingAttributeValue), this.state = A.DATA, this.emitCurrentTagToken();
				break;
			default: this.state = A.ATTRIBUTE_VALUE_UNQUOTED, this._stateAttributeValueUnquoted(e);
		}
	}
	_stateAttributeValueDoubleQuoted(e) {
		switch (e) {
			case t.QUOTATION_MARK:
				this.state = A.AFTER_ATTRIBUTE_VALUE_QUOTED;
				break;
			case t.AMPERSAND:
				this._startCharacterReference();
				break;
			case t.NULL:
				this._err(c.unexpectedNullCharacter), this._extendRunWith("�", 0);
				break;
			case t.EOF:
				this._err(c.eofInTag), this._emitEOFToken();
				break;
			default: this._extendRun(e);
		}
	}
	_stateAttributeValueSingleQuoted(e) {
		switch (e) {
			case t.APOSTROPHE:
				this.state = A.AFTER_ATTRIBUTE_VALUE_QUOTED;
				break;
			case t.AMPERSAND:
				this._startCharacterReference();
				break;
			case t.NULL:
				this._err(c.unexpectedNullCharacter), this._extendRunWith("�", 0);
				break;
			case t.EOF:
				this._err(c.eofInTag), this._emitEOFToken();
				break;
			default: this._extendRun(e);
		}
	}
	_stateAttributeValueUnquoted(e) {
		switch (e) {
			case t.SPACE:
			case t.LINE_FEED:
			case t.TABULATION:
			case t.FORM_FEED:
				this._leaveAttrValue(), this.state = A.BEFORE_ATTRIBUTE_NAME;
				break;
			case t.AMPERSAND:
				this._startCharacterReference();
				break;
			case t.GREATER_THAN_SIGN:
				this._leaveAttrValue(), this.state = A.DATA, this.emitCurrentTagToken();
				break;
			case t.NULL:
				this._err(c.unexpectedNullCharacter), this._extendRunWith("�", 0);
				break;
			case t.QUOTATION_MARK:
			case t.APOSTROPHE:
			case t.LESS_THAN_SIGN:
			case t.EQUALS_SIGN:
			case t.GRAVE_ACCENT:
				this._err(c.unexpectedCharacterInUnquotedAttributeValue), this._extendRun(e);
				break;
			case t.EOF:
				this._err(c.eofInTag), this._emitEOFToken();
				break;
			default: this._extendRun(e);
		}
	}
	_stateAfterAttributeValueQuoted(e) {
		switch (e) {
			case t.SPACE:
			case t.LINE_FEED:
			case t.TABULATION:
			case t.FORM_FEED:
				this._leaveAttrValue(), this.state = A.BEFORE_ATTRIBUTE_NAME;
				break;
			case t.SOLIDUS:
				this._leaveAttrValue(), this.state = A.SELF_CLOSING_START_TAG;
				break;
			case t.GREATER_THAN_SIGN:
				this._leaveAttrValue(), this.state = A.DATA, this.emitCurrentTagToken();
				break;
			case t.EOF:
				this._err(c.eofInTag), this._emitEOFToken();
				break;
			default: this._err(c.missingWhitespaceBetweenAttributes), this._leaveAttrValue(), this.state = A.BEFORE_ATTRIBUTE_NAME, this._stateBeforeAttributeName(e);
		}
	}
	_stateSelfClosingStartTag(e) {
		switch (e) {
			case t.GREATER_THAN_SIGN: {
				let e = this.currentToken;
				e.selfClosing = !0, this.state = A.DATA, this.emitCurrentTagToken();
				break;
			}
			case t.EOF:
				this._err(c.eofInTag), this._emitEOFToken();
				break;
			default: this._err(c.unexpectedSolidusInTag), this.state = A.BEFORE_ATTRIBUTE_NAME, this._stateBeforeAttributeName(e);
		}
	}
	_stateBogusComment(e) {
		let n = this.currentToken;
		switch (e) {
			case t.GREATER_THAN_SIGN:
				this.state = A.DATA, this.emitCurrentComment(n);
				break;
			case t.EOF:
				this.emitCurrentComment(n), this._emitEOFToken();
				break;
			case t.NULL:
				this._err(c.unexpectedNullCharacter), this._extendRunWith("�", 0);
				break;
			default: this._extendRun(e);
		}
	}
	_stateMarkupDeclarationOpen(e) {
		this._consumeSequenceIfMatch(n.DASH_DASH, !0) ? (this._createCommentToken(n.DASH_DASH.length + 1), this.state = A.COMMENT_START) : this._consumeSequenceIfMatch(n.DOCTYPE, !1) ? (this.currentLocation = this.getCurrentLocation(n.DOCTYPE.length + 1), this.state = A.DOCTYPE) : this._consumeSequenceIfMatch(n.CDATA_START, !0) ? this.inForeignNode ? this.state = A.CDATA_SECTION : (this._err(c.cdataInHtmlContent), this._createCommentToken(n.CDATA_START.length + 1), this.currentToken.data = "[CDATA[", this.state = A.BOGUS_COMMENT) : this._ensureHibernation() || (this._err(c.incorrectlyOpenedComment), this._createCommentToken(2), this.state = A.BOGUS_COMMENT, this._stateBogusComment(e));
	}
	_stateCommentStart(e) {
		switch (e) {
			case t.HYPHEN_MINUS:
				this.state = A.COMMENT_START_DASH;
				break;
			case t.GREATER_THAN_SIGN: {
				this._err(c.abruptClosingOfEmptyComment), this.state = A.DATA;
				let e = this.currentToken;
				this.emitCurrentComment(e);
				break;
			}
			default: this.state = A.COMMENT, this._stateComment(e);
		}
	}
	_stateCommentStartDash(e) {
		let n = this.currentToken;
		switch (e) {
			case t.HYPHEN_MINUS:
				this.state = A.COMMENT_END;
				break;
			case t.GREATER_THAN_SIGN:
				this._err(c.abruptClosingOfEmptyComment), this.state = A.DATA, this.emitCurrentComment(n);
				break;
			case t.EOF:
				this._err(c.eofInComment), this.emitCurrentComment(n), this._emitEOFToken();
				break;
			default: this._extendRunWith("-", -1), this.state = A.COMMENT, this._stateComment(e);
		}
	}
	_stateComment(e) {
		let n = this.currentToken;
		switch (e) {
			case t.HYPHEN_MINUS:
				this.state = A.COMMENT_END_DASH;
				break;
			case t.LESS_THAN_SIGN:
				this._extendRunWith("<", 0), this.state = A.COMMENT_LESS_THAN_SIGN;
				break;
			case t.NULL:
				this._err(c.unexpectedNullCharacter), this._extendRunWith("�", 0);
				break;
			case t.EOF:
				this._err(c.eofInComment), this.emitCurrentComment(n), this._emitEOFToken();
				break;
			default: this._extendRun(e);
		}
	}
	_stateCommentLessThanSign(e) {
		switch (e) {
			case t.EXCLAMATION_MARK:
				this._extendRunWith("!", 0), this.state = A.COMMENT_LESS_THAN_SIGN_BANG;
				break;
			case t.LESS_THAN_SIGN:
				this._extendRunWith("<", 0);
				break;
			default: this.state = A.COMMENT, this._stateComment(e);
		}
	}
	_stateCommentLessThanSignBang(e) {
		e === t.HYPHEN_MINUS ? this.state = A.COMMENT_LESS_THAN_SIGN_BANG_DASH : (this.state = A.COMMENT, this._stateComment(e));
	}
	_stateCommentLessThanSignBangDash(e) {
		e === t.HYPHEN_MINUS ? this.state = A.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH : (this.state = A.COMMENT_END_DASH, this._stateCommentEndDash(e));
	}
	_stateCommentLessThanSignBangDashDash(e) {
		e !== t.GREATER_THAN_SIGN && e !== t.EOF && this._err(c.nestedComment), this.state = A.COMMENT_END, this._stateCommentEnd(e);
	}
	_stateCommentEndDash(e) {
		let n = this.currentToken;
		switch (e) {
			case t.HYPHEN_MINUS:
				this.state = A.COMMENT_END;
				break;
			case t.EOF:
				this._err(c.eofInComment), this.emitCurrentComment(n), this._emitEOFToken();
				break;
			default: this._extendRunWith("-", -1), this.state = A.COMMENT, this._stateComment(e);
		}
	}
	_stateCommentEnd(e) {
		let n = this.currentToken;
		switch (e) {
			case t.GREATER_THAN_SIGN:
				this.state = A.DATA, this.emitCurrentComment(n);
				break;
			case t.EXCLAMATION_MARK:
				this.state = A.COMMENT_END_BANG;
				break;
			case t.HYPHEN_MINUS:
				this._extendRunWith("-", -2);
				break;
			case t.EOF:
				this._err(c.eofInComment), this.emitCurrentComment(n), this._emitEOFToken();
				break;
			default: this._extendRunWith("--", -1), this.state = A.COMMENT, this._stateComment(e);
		}
	}
	_stateCommentEndBang(e) {
		let n = this.currentToken;
		switch (e) {
			case t.HYPHEN_MINUS:
				this._extendRunWith("--!", -1), this.state = A.COMMENT_END_DASH;
				break;
			case t.GREATER_THAN_SIGN:
				this._err(c.incorrectlyClosedComment), this.state = A.DATA, this.emitCurrentComment(n);
				break;
			case t.EOF:
				this._err(c.eofInComment), this.emitCurrentComment(n), this._emitEOFToken();
				break;
			default: this._extendRunWith("--!", -1), this.state = A.COMMENT, this._stateComment(e);
		}
	}
	_stateDoctype(e) {
		switch (e) {
			case t.SPACE:
			case t.LINE_FEED:
			case t.TABULATION:
			case t.FORM_FEED:
				this.state = A.BEFORE_DOCTYPE_NAME;
				break;
			case t.GREATER_THAN_SIGN:
				this.state = A.BEFORE_DOCTYPE_NAME, this._stateBeforeDoctypeName(e);
				break;
			case t.EOF: {
				this._err(c.eofInDoctype), this._createDoctypeToken(null);
				let e = this.currentToken;
				e.forceQuirks = !0, this.emitCurrentDoctype(e), this._emitEOFToken();
				break;
			}
			default: this._err(c.missingWhitespaceBeforeDoctypeName), this.state = A.BEFORE_DOCTYPE_NAME, this._stateBeforeDoctypeName(e);
		}
	}
	_stateBeforeDoctypeName(e) {
		if (M(e)) this._createDoctypeToken(String.fromCharCode(rt(e))), this.state = A.DOCTYPE_NAME;
		else switch (e) {
			case t.SPACE:
			case t.LINE_FEED:
			case t.TABULATION:
			case t.FORM_FEED: break;
			case t.NULL:
				this._err(c.unexpectedNullCharacter), this._createDoctypeToken("�"), this.state = A.DOCTYPE_NAME;
				break;
			case t.GREATER_THAN_SIGN: {
				this._err(c.missingDoctypeName), this._createDoctypeToken(null);
				let e = this.currentToken;
				e.forceQuirks = !0, this.emitCurrentDoctype(e), this.state = A.DATA;
				break;
			}
			case t.EOF: {
				this._err(c.eofInDoctype), this._createDoctypeToken(null);
				let e = this.currentToken;
				e.forceQuirks = !0, this.emitCurrentDoctype(e), this._emitEOFToken();
				break;
			}
			default: this._createDoctypeToken(String.fromCodePoint(e)), this.state = A.DOCTYPE_NAME;
		}
	}
	_stateDoctypeName(e) {
		let n = this.currentToken;
		switch (e) {
			case t.SPACE:
			case t.LINE_FEED:
			case t.TABULATION:
			case t.FORM_FEED:
				this.state = A.AFTER_DOCTYPE_NAME;
				break;
			case t.GREATER_THAN_SIGN:
				this.state = A.DATA, this.emitCurrentDoctype(n);
				break;
			case t.NULL:
				this._err(c.unexpectedNullCharacter), n.name += "�";
				break;
			case t.EOF:
				this._err(c.eofInDoctype), n.forceQuirks = !0, this.emitCurrentDoctype(n), this._emitEOFToken();
				break;
			default: n.name += String.fromCodePoint(M(e) ? rt(e) : e);
		}
	}
	_stateAfterDoctypeName(e) {
		let r = this.currentToken;
		switch (e) {
			case t.SPACE:
			case t.LINE_FEED:
			case t.TABULATION:
			case t.FORM_FEED: break;
			case t.GREATER_THAN_SIGN:
				this.state = A.DATA, this.emitCurrentDoctype(r);
				break;
			case t.EOF:
				this._err(c.eofInDoctype), r.forceQuirks = !0, this.emitCurrentDoctype(r), this._emitEOFToken();
				break;
			default: this._consumeSequenceIfMatch(n.PUBLIC, !1) ? this.state = A.AFTER_DOCTYPE_PUBLIC_KEYWORD : this._consumeSequenceIfMatch(n.SYSTEM, !1) ? this.state = A.AFTER_DOCTYPE_SYSTEM_KEYWORD : this._ensureHibernation() || (this._err(c.invalidCharacterSequenceAfterDoctypeName), r.forceQuirks = !0, this.state = A.BOGUS_DOCTYPE, this._stateBogusDoctype(e));
		}
	}
	_stateAfterDoctypePublicKeyword(e) {
		let n = this.currentToken;
		switch (e) {
			case t.SPACE:
			case t.LINE_FEED:
			case t.TABULATION:
			case t.FORM_FEED:
				this.state = A.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER;
				break;
			case t.QUOTATION_MARK:
				this._err(c.missingWhitespaceAfterDoctypePublicKeyword), n.publicId = "", this.state = A.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
				break;
			case t.APOSTROPHE:
				this._err(c.missingWhitespaceAfterDoctypePublicKeyword), n.publicId = "", this.state = A.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
				break;
			case t.GREATER_THAN_SIGN:
				this._err(c.missingDoctypePublicIdentifier), n.forceQuirks = !0, this.state = A.DATA, this.emitCurrentDoctype(n);
				break;
			case t.EOF:
				this._err(c.eofInDoctype), n.forceQuirks = !0, this.emitCurrentDoctype(n), this._emitEOFToken();
				break;
			default: this._err(c.missingQuoteBeforeDoctypePublicIdentifier), n.forceQuirks = !0, this.state = A.BOGUS_DOCTYPE, this._stateBogusDoctype(e);
		}
	}
	_stateBeforeDoctypePublicIdentifier(e) {
		let n = this.currentToken;
		switch (e) {
			case t.SPACE:
			case t.LINE_FEED:
			case t.TABULATION:
			case t.FORM_FEED: break;
			case t.QUOTATION_MARK:
				n.publicId = "", this.state = A.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
				break;
			case t.APOSTROPHE:
				n.publicId = "", this.state = A.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
				break;
			case t.GREATER_THAN_SIGN:
				this._err(c.missingDoctypePublicIdentifier), n.forceQuirks = !0, this.state = A.DATA, this.emitCurrentDoctype(n);
				break;
			case t.EOF:
				this._err(c.eofInDoctype), n.forceQuirks = !0, this.emitCurrentDoctype(n), this._emitEOFToken();
				break;
			default: this._err(c.missingQuoteBeforeDoctypePublicIdentifier), n.forceQuirks = !0, this.state = A.BOGUS_DOCTYPE, this._stateBogusDoctype(e);
		}
	}
	_stateDoctypePublicIdentifierDoubleQuoted(e) {
		let n = this.currentToken;
		switch (e) {
			case t.QUOTATION_MARK:
				this.state = A.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
				break;
			case t.NULL:
				this._err(c.unexpectedNullCharacter), n.publicId += "�";
				break;
			case t.GREATER_THAN_SIGN:
				this._err(c.abruptDoctypePublicIdentifier), n.forceQuirks = !0, this.emitCurrentDoctype(n), this.state = A.DATA;
				break;
			case t.EOF:
				this._err(c.eofInDoctype), n.forceQuirks = !0, this.emitCurrentDoctype(n), this._emitEOFToken();
				break;
			default: n.publicId += String.fromCodePoint(e);
		}
	}
	_stateDoctypePublicIdentifierSingleQuoted(e) {
		let n = this.currentToken;
		switch (e) {
			case t.APOSTROPHE:
				this.state = A.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
				break;
			case t.NULL:
				this._err(c.unexpectedNullCharacter), n.publicId += "�";
				break;
			case t.GREATER_THAN_SIGN:
				this._err(c.abruptDoctypePublicIdentifier), n.forceQuirks = !0, this.emitCurrentDoctype(n), this.state = A.DATA;
				break;
			case t.EOF:
				this._err(c.eofInDoctype), n.forceQuirks = !0, this.emitCurrentDoctype(n), this._emitEOFToken();
				break;
			default: n.publicId += String.fromCodePoint(e);
		}
	}
	_stateAfterDoctypePublicIdentifier(e) {
		let n = this.currentToken;
		switch (e) {
			case t.SPACE:
			case t.LINE_FEED:
			case t.TABULATION:
			case t.FORM_FEED:
				this.state = A.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS;
				break;
			case t.GREATER_THAN_SIGN:
				this.state = A.DATA, this.emitCurrentDoctype(n);
				break;
			case t.QUOTATION_MARK:
				this._err(c.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers), n.systemId = "", this.state = A.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
				break;
			case t.APOSTROPHE:
				this._err(c.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers), n.systemId = "", this.state = A.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
				break;
			case t.EOF:
				this._err(c.eofInDoctype), n.forceQuirks = !0, this.emitCurrentDoctype(n), this._emitEOFToken();
				break;
			default: this._err(c.missingQuoteBeforeDoctypeSystemIdentifier), n.forceQuirks = !0, this.state = A.BOGUS_DOCTYPE, this._stateBogusDoctype(e);
		}
	}
	_stateBetweenDoctypePublicAndSystemIdentifiers(e) {
		let n = this.currentToken;
		switch (e) {
			case t.SPACE:
			case t.LINE_FEED:
			case t.TABULATION:
			case t.FORM_FEED: break;
			case t.GREATER_THAN_SIGN:
				this.emitCurrentDoctype(n), this.state = A.DATA;
				break;
			case t.QUOTATION_MARK:
				n.systemId = "", this.state = A.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
				break;
			case t.APOSTROPHE:
				n.systemId = "", this.state = A.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
				break;
			case t.EOF:
				this._err(c.eofInDoctype), n.forceQuirks = !0, this.emitCurrentDoctype(n), this._emitEOFToken();
				break;
			default: this._err(c.missingQuoteBeforeDoctypeSystemIdentifier), n.forceQuirks = !0, this.state = A.BOGUS_DOCTYPE, this._stateBogusDoctype(e);
		}
	}
	_stateAfterDoctypeSystemKeyword(e) {
		let n = this.currentToken;
		switch (e) {
			case t.SPACE:
			case t.LINE_FEED:
			case t.TABULATION:
			case t.FORM_FEED:
				this.state = A.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER;
				break;
			case t.QUOTATION_MARK:
				this._err(c.missingWhitespaceAfterDoctypeSystemKeyword), n.systemId = "", this.state = A.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
				break;
			case t.APOSTROPHE:
				this._err(c.missingWhitespaceAfterDoctypeSystemKeyword), n.systemId = "", this.state = A.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
				break;
			case t.GREATER_THAN_SIGN:
				this._err(c.missingDoctypeSystemIdentifier), n.forceQuirks = !0, this.state = A.DATA, this.emitCurrentDoctype(n);
				break;
			case t.EOF:
				this._err(c.eofInDoctype), n.forceQuirks = !0, this.emitCurrentDoctype(n), this._emitEOFToken();
				break;
			default: this._err(c.missingQuoteBeforeDoctypeSystemIdentifier), n.forceQuirks = !0, this.state = A.BOGUS_DOCTYPE, this._stateBogusDoctype(e);
		}
	}
	_stateBeforeDoctypeSystemIdentifier(e) {
		let n = this.currentToken;
		switch (e) {
			case t.SPACE:
			case t.LINE_FEED:
			case t.TABULATION:
			case t.FORM_FEED: break;
			case t.QUOTATION_MARK:
				n.systemId = "", this.state = A.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
				break;
			case t.APOSTROPHE:
				n.systemId = "", this.state = A.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
				break;
			case t.GREATER_THAN_SIGN:
				this._err(c.missingDoctypeSystemIdentifier), n.forceQuirks = !0, this.state = A.DATA, this.emitCurrentDoctype(n);
				break;
			case t.EOF:
				this._err(c.eofInDoctype), n.forceQuirks = !0, this.emitCurrentDoctype(n), this._emitEOFToken();
				break;
			default: this._err(c.missingQuoteBeforeDoctypeSystemIdentifier), n.forceQuirks = !0, this.state = A.BOGUS_DOCTYPE, this._stateBogusDoctype(e);
		}
	}
	_stateDoctypeSystemIdentifierDoubleQuoted(e) {
		let n = this.currentToken;
		switch (e) {
			case t.QUOTATION_MARK:
				this.state = A.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
				break;
			case t.NULL:
				this._err(c.unexpectedNullCharacter), n.systemId += "�";
				break;
			case t.GREATER_THAN_SIGN:
				this._err(c.abruptDoctypeSystemIdentifier), n.forceQuirks = !0, this.emitCurrentDoctype(n), this.state = A.DATA;
				break;
			case t.EOF:
				this._err(c.eofInDoctype), n.forceQuirks = !0, this.emitCurrentDoctype(n), this._emitEOFToken();
				break;
			default: n.systemId += String.fromCodePoint(e);
		}
	}
	_stateDoctypeSystemIdentifierSingleQuoted(e) {
		let n = this.currentToken;
		switch (e) {
			case t.APOSTROPHE:
				this.state = A.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
				break;
			case t.NULL:
				this._err(c.unexpectedNullCharacter), n.systemId += "�";
				break;
			case t.GREATER_THAN_SIGN:
				this._err(c.abruptDoctypeSystemIdentifier), n.forceQuirks = !0, this.emitCurrentDoctype(n), this.state = A.DATA;
				break;
			case t.EOF:
				this._err(c.eofInDoctype), n.forceQuirks = !0, this.emitCurrentDoctype(n), this._emitEOFToken();
				break;
			default: n.systemId += String.fromCodePoint(e);
		}
	}
	_stateAfterDoctypeSystemIdentifier(e) {
		let n = this.currentToken;
		switch (e) {
			case t.SPACE:
			case t.LINE_FEED:
			case t.TABULATION:
			case t.FORM_FEED: break;
			case t.GREATER_THAN_SIGN:
				this.emitCurrentDoctype(n), this.state = A.DATA;
				break;
			case t.EOF:
				this._err(c.eofInDoctype), n.forceQuirks = !0, this.emitCurrentDoctype(n), this._emitEOFToken();
				break;
			default: this._err(c.unexpectedCharacterAfterDoctypeSystemIdentifier), this.state = A.BOGUS_DOCTYPE, this._stateBogusDoctype(e);
		}
	}
	_stateBogusDoctype(e) {
		let n = this.currentToken;
		switch (e) {
			case t.GREATER_THAN_SIGN:
				this.emitCurrentDoctype(n), this.state = A.DATA;
				break;
			case t.NULL:
				this._err(c.unexpectedNullCharacter);
				break;
			case t.EOF: this.emitCurrentDoctype(n), this._emitEOFToken();
		}
	}
	_stateCdataSection(e) {
		switch (e) {
			case t.RIGHT_SQUARE_BRACKET:
				this.state = A.CDATA_SECTION_BRACKET;
				break;
			case t.EOF:
				this._err(c.eofInCdata), this._emitEOFToken();
				break;
			default: this._emitCodePoint(e);
		}
	}
	_stateCdataSectionBracket(e) {
		e === t.RIGHT_SQUARE_BRACKET ? this.state = A.CDATA_SECTION_END : (this._emitChars("]", -1), this.state = A.CDATA_SECTION, this._stateCdataSection(e));
	}
	_stateCdataSectionEnd(e) {
		switch (e) {
			case t.GREATER_THAN_SIGN:
				this.state = A.DATA;
				break;
			case t.RIGHT_SQUARE_BRACKET:
				this._emitChars("]", -2);
				break;
			default: this._emitChars("]]", -1), this.state = A.CDATA_SECTION, this._stateCdataSection(e);
		}
	}
	_stateCharacterReference() {
		let e = this.entityDecoder.write(this.preprocessor.html, this.preprocessor.pos);
		if (e < 0) {
			if (this.preprocessor.lastChunkWritten) e = this.entityDecoder.end();
			else {
				this.active = !1, this.preprocessor.pos = this.preprocessor.html.length - 1, this.consumedAfterSnapshot = 0, this.preprocessor.endOfChunkHit = !0;
				return;
			}
		}
		e === 0 ? (this.preprocessor.pos = this.entityStartPos, this._flushCodePointConsumedAsCharacterReference(t.AMPERSAND), this.state = !this._isCharacterReferenceInAttribute() && nt(this.preprocessor.peek(1)) ? A.AMBIGUOUS_AMPERSAND : this.returnState) : this.state = this.returnState;
	}
	_stateAmbiguousAmpersand(e) {
		nt(e) ? this._flushCodePointConsumedAsCharacterReference(e) : (e === t.SEMICOLON && this._err(c.unknownNamedCharacterReference), this.state = this.returnState, this._callState(e));
	}
}, ct = /* @__PURE__ */ new Set([
	D.DD,
	D.DT,
	D.LI,
	D.OPTGROUP,
	D.OPTION,
	D.P,
	D.RB,
	D.RP,
	D.RT,
	D.RTC
]), lt = /* @__PURE__ */ new Set([
	...ct,
	D.CAPTION,
	D.COLGROUP,
	D.TBODY,
	D.TD,
	D.TFOOT,
	D.TH,
	D.THEAD,
	D.TR
]), ut = 64, P = 256, F = 512, I = 768, dt = [
	D.H1,
	D.H2,
	D.H3,
	D.H4,
	D.H5,
	D.H6
], ft = [
	D.TBODY,
	D.TFOOT,
	D.THEAD
], pt = [
	D.TR,
	D.TEMPLATE,
	D.HTML
], mt = [
	...ft,
	D.TEMPLATE,
	D.HTML
], ht = [
	D.TABLE,
	D.TEMPLATE,
	D.HTML
], gt = [D.TD, D.TH], L = 1, _t = 2, R = 4, z = 8, vt = 16, B = 32, V = new Uint8Array(I);
for (let [e, t] of [
	[C.HTML, 0],
	[C.SVG, P],
	[C.MATHML, F]
]) for (let n of Ze[e]) V[t + n] = e === C.HTML && (n === D.ADDRESS || n === D.DIV || n === D.P) ? L : 3;
for (let e of [
	D.APPLET,
	D.CAPTION,
	D.HTML,
	D.MARQUEE,
	D.OBJECT,
	D.TABLE,
	D.TD,
	D.TEMPLATE,
	D.TH,
	P + D.DESC,
	P + D.FOREIGN_OBJECT,
	P + D.TITLE,
	F + D.ANNOTATION_XML,
	F + D.MI,
	F + D.MN,
	F + D.MO,
	F + D.MS,
	F + D.MTEXT
]) V[e] |= 28;
V[D.OL] |= z, V[D.UL] |= z, V[D.BUTTON] |= vt, V[D.TABLE] |= B, V[D.HTML] |= B;
var H = new Uint8Array(I);
for (let e of [
	D.A,
	D.B,
	D.BIG,
	D.CODE,
	D.EM,
	D.FONT,
	D.I,
	D.NOBR,
	D.S,
	D.SMALL,
	D.STRIKE,
	D.STRONG,
	D.TT,
	D.U
]) H[e] = 1;
function yt(e, t) {
	if (t === D.UNKNOWN) return -1;
	switch (e) {
		case C.HTML: return t;
		case C.SVG: return P + t;
		case C.MATHML: return F + t;
		default: return -1;
	}
}
var bt = class {
	get currentTmplContentOrNode() {
		return this._isInTemplate() ? this.treeAdapter.getTemplateContent(this.current) : this.current;
	}
	constructor(e, t, n) {
		this.treeAdapter = t, this.handler = n, this.items = [], this.tagIDs = [], this.stackTop = -1, this.depth = 0, this.tmplCount = 0, this.currentTagId = D.UNKNOWN, this.indexed = !1, this.below = [], this.above = [], this.keys = [], this.keyPrev = [], this.keyNext = [], this.keyTops = /* @__PURE__ */ new Int32Array(), this.specials = [], this.listItemBoundaries = [], this.scopeBoundaries = [], this.htmlSlots = [], this.formattingSlots = /* @__PURE__ */ new Map(), this.current = e;
	}
	_indexOf(e) {
		if (this.indexed) {
			let t = this.formattingSlots.get(e);
			if (t !== void 0) return t;
			if (H[O(this.treeAdapter.getTagName(e))]) return -1;
		}
		return this.items.lastIndexOf(e, this.stackTop);
	}
	slotBelow(e) {
		return this.indexed ? this.below[e] : e - 1;
	}
	slotAbove(e) {
		return this.indexed ? this.above[e] : e === this.stackTop ? -1 : e + 1;
	}
	_isInTemplate() {
		return this.currentTagId === D.TEMPLATE && this.treeAdapter.getNamespaceURI(this.current) === C.HTML;
	}
	_updateCurrentElement() {
		this.current = this.items[this.stackTop], this.currentTagId = this.tagIDs[this.stackTop];
	}
	_nameKey(e, t, n) {
		let r = `${e} ${t}`, i = this.nameKeys?.get(r);
		if (i === void 0 && n && (this.nameKeys ??= /* @__PURE__ */ new Map(), i = I + this.nameKeys.size, this.nameKeys.set(r, i), i === this.keyTops.length)) {
			let e = new Int32Array(2 * i).fill(-1);
			e.set(this.keyTops), this.keyTops = e;
		}
		return i ?? -1;
	}
	_indexAll() {
		this.indexed = !0, this.keyTops = new Int32Array(I).fill(-1);
		for (let e = 0; e <= this.stackTop; e++) this._index(e, e - 1);
	}
	_index(e, t) {
		let n = this.items[e], r = this.tagIDs[e], i = this.treeAdapter.getNamespaceURI(n), a = yt(i, r);
		a === -1 && (a = this._nameKey(i, this.treeAdapter.getTagName(n), !0));
		let o = this.keyTops[a];
		this.keys[e] = a, this.keyPrev[e] = o, this.keyNext[e] = -1, o !== -1 && (this.keyNext[o] = e), this.keyTops[a] = e, this.above[e] = -1, this._link(e, t, i === C.HTML), H[r] && this.formattingSlots.set(n, e);
	}
	_link(e, t, n) {
		let r = this.keys[e], i = r < I ? V[r] : 0;
		this.below[e] = t, t === -1 ? (this.specials[e] = i & L, this.listItemBoundaries[e] = (i & _t) >> 1, this.scopeBoundaries[e] = (i & R) >> 2, this.htmlSlots[e] = n ? e : -1) : (this.above[t] = e, this.specials[e] = this.specials[t] + (i & L), this.listItemBoundaries[e] = this.listItemBoundaries[t] + ((i & _t) >> 1), this.scopeBoundaries[e] = this.scopeBoundaries[t] + ((i & R) >> 2), this.htmlSlots[e] = n ? e : this.htmlSlots[t]);
	}
	_unindex(e) {
		let t = this.keys[e], n = this.keyPrev[e], r = this.keyNext[e];
		n !== -1 && (this.keyNext[n] = r), r === -1 ? this.keyTops[t] = n : this.keyPrev[r] = n, H[this.tagIDs[e]] && this.formattingSlots.delete(this.items[e]);
	}
	_move(e, t) {
		let n = this.items[e], r = this.keys[e], i = this.keyPrev[e], a = this.keyNext[e];
		this.items[t] = n, this.tagIDs[t] = this.tagIDs[e], this.keys[t] = r, this.keyPrev[t] = i, this.keyNext[t] = a, i !== -1 && (this.keyNext[i] = t), a === -1 ? this.keyTops[r] = t : this.keyPrev[a] = t, H[this.tagIDs[t]] && this.formattingSlots.set(n, t);
	}
	indexOfTopmost(e) {
		if (this.indexed) return this.keyTops[e];
		for (let t = this.stackTop; t >= 0; t--) if (this.tagIDs[t] === e && this.treeAdapter.getNamespaceURI(this.items[t]) === C.HTML) return t;
		return -1;
	}
	indexOfTopmostOf(e) {
		if (this.indexed) {
			let t = -1;
			for (let n of e) this.keyTops[n] > t && (t = this.keyTops[n]);
			return t;
		}
		for (let t = this.stackTop; t >= 0; t--) if (e.includes(this.tagIDs[t]) && this.treeAdapter.getNamespaceURI(this.items[t]) === C.HTML) return t;
		return -1;
	}
	indexOfTopmostByName(e, t) {
		if (this.indexed) {
			let n = yt(e, O(t));
			return n === -1 && (n = this._nameKey(e, t, !1)), n === -1 ? -1 : this.keyTops[n];
		}
		for (let n = this.stackTop; n >= 0; n--) {
			let r = this.items[n];
			if (this.treeAdapter.getTagName(r) === t && this.treeAdapter.getNamespaceURI(r) === e) return n;
		}
		return -1;
	}
	indexOfTopmostHtmlElement() {
		if (this.indexed) return this.stackTop === -1 ? -1 : this.htmlSlots[this.stackTop];
		let e = this.stackTop;
		for (; e >= 0 && this.treeAdapter.getNamespaceURI(this.items[e]) !== C.HTML;) e--;
		return e;
	}
	_hasAbove(e, t) {
		for (let n = this.stackTop; n > e; n--) {
			let e = yt(this.treeAdapter.getNamespaceURI(this.items[n]), this.tagIDs[n]);
			if (e !== -1 && V[e] & t) return !0;
		}
		return !1;
	}
	hasSpecialElementAbove(e) {
		return this.indexed ? this.specials[this.stackTop] !== this.specials[e] : this._hasAbove(e, L);
	}
	hasListItemBoundaryAbove(e) {
		return this.indexed ? this.listItemBoundaries[this.stackTop] !== this.listItemBoundaries[e] : this._hasAbove(e, _t);
	}
	push(e, t) {
		let n = this.stackTop;
		this.stackTop++, this.depth++, this.items[this.stackTop] = e, this.current = e, this.tagIDs[this.stackTop] = t, this.currentTagId = t, this.indexed ? this._index(this.stackTop, n) : this.depth === ut && this._indexAll(), this._isInTemplate() && this.tmplCount++, this.handler.onItemPush(e, t, !0);
	}
	_popCurrent() {
		this.tmplCount > 0 && this._isInTemplate() && this.tmplCount--, this.indexed ? (this._unindex(this.stackTop), this.stackTop = this.below[this.stackTop], this.stackTop !== -1 && (this.above[this.stackTop] = -1)) : this.stackTop--, this.depth--, this._updateCurrentElement();
	}
	pop() {
		let e = this.current;
		this._popCurrent(), this.handler.onItemPop(e, !0);
	}
	replace(e, t) {
		let n = this._indexOf(e);
		this.items[n] = t, this.indexed && H[this.tagIDs[n]] && (this.formattingSlots.delete(e), this.formattingSlots.set(t, n)), n === this.stackTop && (this.current = t);
	}
	replaceFormattingElement(e, t, n, r) {
		let i = this.items[e];
		if (!this.indexed) {
			this.items.splice(e, 1), this.tagIDs.splice(e, 1), this.handler.onItemPop(i, !1), this.items.splice(t, 0, n), this.tagIDs.splice(t, 0, r), t === this.stackTop && this._updateCurrentElement(), this.current && this.currentTagId !== void 0 && this.handler.onItemPush(this.current, this.currentTagId, t === this.stackTop);
			return;
		}
		let a = this.keys[e], o = this.below[e], s = this.above[t], c = [];
		for (let n = this.above[e]; n !== t; n = this.above[n]) c.push(n);
		let l = this.keyNext[e];
		this._unindex(e), this.items[e] = void 0, this.handler.onItemPop(i, !1);
		let u = t - 1;
		for (; c.length > 0 && c[c.length - 1] === u;) c.pop(), u--;
		for (let e = u + 1; e <= t; e++) this._move(e, e - 1);
		let d = l === -1 ? this.keyTops[a] : this.keyPrev[l];
		this.items[t] = n, this.tagIDs[t] = r, this.keys[t] = a, this.keyPrev[t] = d, this.keyNext[t] = l, d !== -1 && (this.keyNext[d] = t), l === -1 ? this.keyTops[a] = t : this.keyPrev[l] = t, H[r] && this.formattingSlots.set(n, t);
		let f = o;
		for (let e of c) this._link(e, f, !0), f = e;
		for (let e = u; e < t; e++) this._link(e, f, !0), f = e;
		this._link(t, f, !0), s === -1 && this._updateCurrentElement(), this.current && this.currentTagId !== void 0 && this.handler.onItemPush(this.current, this.currentTagId, s === -1);
	}
	popUntilTagNamePopped(e) {
		this.shortenToLength(Math.max(this.indexOfTopmost(e), 0));
	}
	shortenToLength(e) {
		for (; this.stackTop >= e;) {
			let t = this.current;
			this._popCurrent(), this.handler.onItemPop(t, this.stackTop < e);
		}
	}
	popUntilElementPopped(e) {
		let t = this._indexOf(e);
		this.shortenToLength(Math.max(t, 0));
	}
	popUntilNumberedHeaderPopped() {
		this.shortenToLength(Math.max(this.indexOfTopmostOf(dt), 0));
	}
	popUntilTableCellPopped() {
		this.shortenToLength(Math.max(this.indexOfTopmostOf(gt), 0));
	}
	popAllUpToHtmlElement() {
		this.tmplCount = 0, this.shortenToLength(1);
	}
	clearBackToTableContext() {
		this.shortenToLength(this.indexOfTopmostOf(ht) + 1);
	}
	clearBackToTableBodyContext() {
		this.shortenToLength(this.indexOfTopmostOf(mt) + 1);
	}
	clearBackToTableRowContext() {
		this.shortenToLength(this.indexOfTopmostOf(pt) + 1);
	}
	remove(e) {
		let t = this._indexOf(e);
		t !== -1 && this.removeAt(t);
	}
	removeAt(e) {
		if (e === this.stackTop) {
			this.pop();
			return;
		}
		let t = this.items[e];
		if (this.depth--, this.indexed) {
			let t = this.keys[e] < I ? V[this.keys[e]] : 0, n = this.below[e], r = this.above[e];
			if (this._unindex(e), this.items[e] = void 0, this.below[r] = n, n !== -1 && (this.above[n] = r), t !== 0) for (let e = r; e !== -1; e = this.above[e]) this.specials[e] -= t & L, this.listItemBoundaries[e] -= (t & _t) >> 1, this.scopeBoundaries[e] -= (t & R) >> 2;
			let i = n === -1 ? -1 : this.htmlSlots[n];
			for (let t = r; t !== -1 && this.htmlSlots[t] === e; t = this.above[t]) this.htmlSlots[t] = i;
		} else this.items.splice(e, 1), this.tagIDs.splice(e, 1), this.stackTop--, this._updateCurrentElement();
		this.handler.onItemPop(t, !1);
	}
	tryPeekProperlyNestedBodyElement() {
		return this.stackTop >= 1 && this.tagIDs[1] === D.BODY ? this.items[1] : null;
	}
	contains(e) {
		return this._indexOf(e) > -1;
	}
	getCommonAncestor(e) {
		let t = this._indexOf(e), n = t === -1 ? -1 : this.slotBelow(t);
		return n === -1 ? null : this.items[n];
	}
	isRootHtmlElementCurrent() {
		return this.stackTop === 0 && this.tagIDs[0] === D.HTML;
	}
	_isInScope(e, t) {
		let n = -1;
		switch (t) {
			case z:
				n = Math.max(this.keyTops[D.OL], this.keyTops[D.UL]);
				break;
			case vt:
				n = this.keyTops[D.BUTTON];
				break;
			case B: return n = Math.max(this.keyTops[D.TABLE], this.keyTops[D.HTML]), e === -1 ? n === -1 : e >= n;
		}
		return e === -1 ? n === -1 && (this.stackTop === -1 || this.scopeBoundaries[this.stackTop] === 0) : e >= n && this.scopeBoundaries[this.stackTop] === this.scopeBoundaries[e];
	}
	_scanScope(e, t, n, r) {
		for (let i = this.stackTop; i >= 0; i--) {
			let a = yt(this.treeAdapter.getNamespaceURI(this.items[i]), this.tagIDs[i]);
			if (a !== -1) {
				if ((t ? t.includes(a) : a === e) && (!r || this.items[i] === r)) return !0;
				if (V[a] & n) return !1;
			}
		}
		return !0;
	}
	hasInScope(e, t) {
		return this.indexed ? this._isInScope(t ? this._indexOf(t) : this.keyTops[e], R) : this._scanScope(e, null, R, t);
	}
	hasInListItemScope(e) {
		return this.indexed ? this._isInScope(this.keyTops[e], z) : this._scanScope(e, null, z);
	}
	hasInButtonScope(e) {
		return this.indexed ? this._isInScope(this.keyTops[e], vt) : this._scanScope(e, null, vt);
	}
	hasNumberedHeaderInScope() {
		return this.indexed ? this._isInScope(this.indexOfTopmostOf(dt), R) : this._scanScope(D.UNKNOWN, dt, R);
	}
	hasInTableScope(e) {
		return this.indexed ? this._isInScope(this.keyTops[e], B) : this._scanScope(e, null, B);
	}
	hasTableBodyContextInTableScope() {
		return this.indexed ? this._isInScope(this.indexOfTopmostOf(ft), B) : this._scanScope(D.UNKNOWN, ft, B);
	}
	hasInSelectScope(e) {
		for (let t = this.stackTop; t >= 0; t = this.slotBelow(t)) if (this.treeAdapter.getNamespaceURI(this.items[t]) === C.HTML) switch (this.tagIDs[t]) {
			case e: return !0;
			case D.OPTION:
			case D.OPTGROUP: break;
			default: return !1;
		}
		return !0;
	}
	generateImpliedEndTags() {
		for (; this.currentTagId !== void 0 && ct.has(this.currentTagId) && this.treeAdapter.getNamespaceURI(this.current) === C.HTML;) this.pop();
	}
	generateImpliedEndTagsThoroughly() {
		for (; this.currentTagId !== void 0 && lt.has(this.currentTagId) && this.treeAdapter.getNamespaceURI(this.current) === C.HTML;) this.pop();
	}
	generateImpliedEndTagsWithExclusion(e) {
		for (; this.currentTagId !== void 0 && this.currentTagId !== e && lt.has(this.currentTagId) && this.treeAdapter.getNamespaceURI(this.current) === C.HTML;) this.pop();
	}
}, xt = 3, U;
(function(e) {
	e[e.Marker = 0] = "Marker", e[e.Element = 1] = "Element";
})(U ||= {});
var St = class {
	constructor() {
		this.newest = null, this.bookmark = null, this.index = null, this.elementEntries = /* @__PURE__ */ new Map();
	}
	_insertElementEntry(e, t, n) {
		let r = n === null ? null : n.newer, i = {
			type: U.Element,
			element: e,
			token: t,
			older: n,
			newer: r,
			ark: null,
			olderSameTag: null,
			newerSameTag: null
		};
		return r === null ? this.newest = i : r.older = i, n !== null && (n.newer = i), this.index === null ? null : this._addToIndex(this.index, i);
	}
	_addToIndex(e, t) {
		let { tagName: n, attrs: r } = t.token, i = n + r.map(({ name: e, value: t }) => `\0${e}\0${t}`).sort().join(""), a = e.arks.get(i);
		a === void 0 && (a = {
			entries: [],
			key: i
		}, e.arks.set(i, a)), a.entries.push(t), t.ark = a, this.elementEntries.set(t.element, t);
		let o = e.tagNames.get(n);
		return o === void 0 && (o = { olderSameTag: null }, e.tagNames.set(n, o)), t.olderSameTag = o.olderSameTag, t.newerSameTag = o, o.olderSameTag !== null && (o.olderSameTag.newerSameTag = t), o.olderSameTag = t, a;
	}
	insertMarker() {
		if (this.index === null) for (let e = this.newest; e !== null && e.type === U.Element; e = e.older) this.elementEntries.set(e.element, e);
		let e = {
			type: U.Marker,
			older: this.newest,
			newer: null,
			outerIndex: this.index
		};
		this.newest !== null && (this.newest.newer = e), this.newest = e, this.index = null;
	}
	pushElement(e, t) {
		if (this.index === null) {
			let e = null, t = 0;
			for (let n = this.newest; n !== null && n.type === U.Element; n = n.older) e = n, t++;
			if (t >= xt) {
				this.index = {
					arks: /* @__PURE__ */ new Map(),
					tagNames: /* @__PURE__ */ new Map()
				};
				for (let t = e; t !== null && t.type === U.Element; t = t.newer) this._addToIndex(this.index, t);
			}
		}
		let n = this._insertElementEntry(e, t, this.newest);
		n !== null && n.entries.length > xt && this.removeEntry(n.entries[0]);
	}
	insertElementAfterBookmark(e, t) {
		let { bookmark: n } = this;
		this.bookmark = null, this._insertElementEntry(e, t, n);
	}
	removeEntry(e) {
		var t;
		if (!(e.newer === null ? this.newest !== e : e.newer.older !== e)) {
			if (this.elementEntries.delete(e.element), e.newer === null ? this.newest = e.older : e.newer.older = e.older, e.older !== null && (e.older.newer = e.newer), e.ark !== null) {
				let { entries: n, key: r } = e.ark;
				n.splice(n.indexOf(e), 1), n.length === 0 && ((t = this.index) == null || t.arks.delete(r));
			}
			e.newerSameTag !== null && (e.newerSameTag.olderSameTag = e.olderSameTag, e.olderSameTag !== null && (e.olderSameTag.newerSameTag = e.newerSameTag));
		}
	}
	replaceElement(e, t) {
		this.elementEntries.delete(e.element) && this.elementEntries.set(t, e), e.element = t;
	}
	clearToLastMarker() {
		let e = this.newest;
		for (; e !== null && e.type === U.Element; e = e.older) this.elementEntries.delete(e.element);
		this.newest = e === null ? null : e.older, this.index = e === null ? null : e.outerIndex, this.newest !== null && (this.newest.newer = null);
	}
	getElementEntryInScopeWithTagName(e) {
		if (this.index !== null) return this.index.tagNames.get(e)?.olderSameTag ?? null;
		for (let t = this.newest; t !== null && t.type === U.Element; t = t.older) if (t.token.tagName === e) return t;
		return null;
	}
	getElementEntry(e) {
		if (this.index === null) {
			for (let t = this.newest; t !== null && t.type === U.Element; t = t.older) if (t.element === e) return t;
		}
		return this.elementEntries.get(e);
	}
}, Ct = /* @__PURE__ */ new WeakMap(), W = {
	createDocument() {
		return {
			nodeName: "#document",
			mode: T.NO_QUIRKS,
			childNodes: []
		};
	},
	createDocumentFragment() {
		return {
			nodeName: "#document-fragment",
			childNodes: []
		};
	},
	createElement(e, t, n) {
		return {
			nodeName: e,
			tagName: e,
			attrs: n,
			namespaceURI: t,
			childNodes: [],
			parentNode: null
		};
	},
	createCommentNode(e) {
		return {
			nodeName: "#comment",
			data: e,
			parentNode: null
		};
	},
	createTextNode(e) {
		return {
			nodeName: "#text",
			value: e,
			parentNode: null
		};
	},
	appendChild(e, t) {
		e.childNodes.push(t), t.parentNode = e;
	},
	insertBefore(e, t, n) {
		let { childNodes: r } = e, i = r[r.length - 1] === n ? r.length - 1 : r.indexOf(n);
		r.splice(i, 0, t), t.parentNode = e;
	},
	setTemplateContent(e, t) {
		e.content = t;
	},
	getTemplateContent(e) {
		return e.content;
	},
	setDocumentType(e, t, n, r) {
		let i = e.childNodes.find((e) => e.nodeName === "#documentType");
		if (i) i.name = t, i.publicId = n, i.systemId = r;
		else {
			let i = {
				nodeName: "#documentType",
				name: t,
				publicId: n,
				systemId: r,
				parentNode: null
			};
			W.appendChild(e, i);
		}
	},
	setDocumentMode(e, t) {
		e.mode = t;
	},
	getDocumentMode(e) {
		return e.mode;
	},
	detachNode(e) {
		if (e.parentNode) {
			let { childNodes: t } = e.parentNode, n = t[t.length - 1] === e ? t.length - 1 : t.indexOf(e);
			t.splice(n, 1), e.parentNode = null;
		}
	},
	insertText(e, t) {
		if (e.childNodes.length > 0) {
			let n = e.childNodes[e.childNodes.length - 1];
			if (W.isTextNode(n)) {
				n.value += t;
				return;
			}
		}
		W.appendChild(e, W.createTextNode(t));
	},
	insertTextBefore(e, t, n) {
		let { childNodes: r } = e, i = r[(r[r.length - 1] === n ? r.length - 1 : r.indexOf(n)) - 1];
		i && W.isTextNode(i) ? i.value += t : W.insertBefore(e, W.createTextNode(t), n);
	},
	adoptAttributes(e, t) {
		if (t.length === 0 || t === e.attrs) return;
		let n = Ct.get(e.attrs), r = n?.size === e.attrs.length && t.every(({ name: t }) => {
			let r = n.get(t);
			return r === void 0 || e.attrs[r]?.name === t;
		}), i = r ? n : /* @__PURE__ */ new Map();
		if (!r) {
			for (let t = 0; t < e.attrs.length; t++) {
				let n = e.attrs[t];
				n !== void 0 && i.set(n.name, t);
			}
			Ct.set(e.attrs, i);
		}
		let a = e.attrs.length;
		for (let n = 0; n < t.length; n++) i.has(t[n].name) || e.attrs.push(t[n]);
		for (let t = a; t < e.attrs.length; t++) i.set(e.attrs[t].name, t);
		i.size !== e.attrs.length && Ct.delete(e.attrs);
	},
	getFirstChild(e) {
		return e.childNodes[0];
	},
	getChildNodes(e) {
		return e.childNodes;
	},
	getParentNode(e) {
		return e.parentNode;
	},
	getAttrList(e) {
		return e.attrs;
	},
	getTagName(e) {
		return e.tagName;
	},
	getNamespaceURI(e) {
		return e.namespaceURI;
	},
	getTextNodeContent(e) {
		return e.value;
	},
	getCommentNodeContent(e) {
		return e.data;
	},
	getDocumentTypeNodeName(e) {
		return e.name;
	},
	getDocumentTypeNodePublicId(e) {
		return e.publicId;
	},
	getDocumentTypeNodeSystemId(e) {
		return e.systemId;
	},
	isTextNode(e) {
		return e.nodeName === "#text";
	},
	isCommentNode(e) {
		return e.nodeName === "#comment";
	},
	isDocumentTypeNode(e) {
		return e.nodeName === "#documentType";
	},
	isElementNode(e) {
		return Object.prototype.hasOwnProperty.call(e, "tagName");
	},
	setNodeSourceCodeLocation(e, t) {
		e.sourceCodeLocation = t;
	},
	getNodeSourceCodeLocation(e) {
		return e.sourceCodeLocation;
	},
	updateNodeSourceCodeLocation(e, t) {
		e.sourceCodeLocation = {
			...e.sourceCodeLocation,
			...t
		};
	}
}, wt = "html", Tt = "about:legacy-compat", Et = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd", Dt = /* @__PURE__ */ "+//silmaril//dtd html pro v0r11 19970101//,-//as//dtd html 3.0 aswedit + extensions//,-//advasoft ltd//dtd html 3.0 aswedit + extensions//,-//ietf//dtd html 2.0 level 1//,-//ietf//dtd html 2.0 level 2//,-//ietf//dtd html 2.0 strict level 1//,-//ietf//dtd html 2.0 strict level 2//,-//ietf//dtd html 2.0 strict//,-//ietf//dtd html 2.0//,-//ietf//dtd html 2.1e//,-//ietf//dtd html 3.0//,-//ietf//dtd html 3.2 final//,-//ietf//dtd html 3.2//,-//ietf//dtd html 3//,-//ietf//dtd html level 0//,-//ietf//dtd html level 1//,-//ietf//dtd html level 2//,-//ietf//dtd html level 3//,-//ietf//dtd html strict level 0//,-//ietf//dtd html strict level 1//,-//ietf//dtd html strict level 2//,-//ietf//dtd html strict level 3//,-//ietf//dtd html strict//,-//ietf//dtd html//,-//metrius//dtd metrius presentational//,-//microsoft//dtd internet explorer 2.0 html strict//,-//microsoft//dtd internet explorer 2.0 html//,-//microsoft//dtd internet explorer 2.0 tables//,-//microsoft//dtd internet explorer 3.0 html strict//,-//microsoft//dtd internet explorer 3.0 html//,-//microsoft//dtd internet explorer 3.0 tables//,-//netscape comm. corp.//dtd html//,-//netscape comm. corp.//dtd strict html//,-//o'reilly and associates//dtd html 2.0//,-//o'reilly and associates//dtd html extended 1.0//,-//o'reilly and associates//dtd html extended relaxed 1.0//,-//sq//dtd html 2.0 hotmetal + extensions//,-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//,-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//,-//spyglass//dtd html 2.0 extended//,-//sun microsystems corp.//dtd hotjava html//,-//sun microsystems corp.//dtd hotjava strict html//,-//w3c//dtd html 3 1995-03-24//,-//w3c//dtd html 3.2 draft//,-//w3c//dtd html 3.2 final//,-//w3c//dtd html 3.2//,-//w3c//dtd html 3.2s draft//,-//w3c//dtd html 4.0 frameset//,-//w3c//dtd html 4.0 transitional//,-//w3c//dtd html experimental 19960712//,-//w3c//dtd html experimental 970421//,-//w3c//dtd w3 html//,-//w3o//dtd w3 html 3.0//,-//webtechs//dtd mozilla html 2.0//,-//webtechs//dtd mozilla html//".split(","), Ot = [
	...Dt,
	"-//w3c//dtd html 4.01 frameset//",
	"-//w3c//dtd html 4.01 transitional//"
], kt = /* @__PURE__ */ new Set([
	"-//w3o//dtd w3 html strict 3.0//en//",
	"-/w3c/dtd html 4.0 transitional/en",
	"html"
]), At = ["-//w3c//dtd xhtml 1.0 frameset//", "-//w3c//dtd xhtml 1.0 transitional//"], jt = [
	...At,
	"-//w3c//dtd html 4.01 frameset//",
	"-//w3c//dtd html 4.01 transitional//"
];
function Mt(e, t) {
	return t.some((t) => e.startsWith(t));
}
function Nt(e) {
	return e.name === wt && e.publicId === null && (e.systemId === null || e.systemId === Tt);
}
function Pt(e) {
	if (e.name !== wt) return T.QUIRKS;
	let { systemId: t } = e;
	if (t && t.toLowerCase() === Et) return T.QUIRKS;
	let { publicId: n } = e;
	if (n !== null) {
		if (n = n.toLowerCase(), kt.has(n)) return T.QUIRKS;
		let e = t === null ? Ot : Dt;
		if (Mt(n, e)) return T.QUIRKS;
		if (e = t === null ? At : jt, Mt(n, e)) return T.LIMITED_QUIRKS;
	}
	return T.NO_QUIRKS;
}
// node_modules/parse5/dist/common/foreign-content.js
var Ft = {
	TEXT_HTML: "text/html",
	APPLICATION_XML: "application/xhtml+xml"
}, It = "definitionurl", Lt = "definitionURL", Rt = new Map((/* @__PURE__ */ "attributeName.attributeType.baseFrequency.baseProfile.calcMode.clipPathUnits.diffuseConstant.edgeMode.filterUnits.glyphRef.gradientTransform.gradientUnits.kernelMatrix.kernelUnitLength.keyPoints.keySplines.keyTimes.lengthAdjust.limitingConeAngle.markerHeight.markerUnits.markerWidth.maskContentUnits.maskUnits.numOctaves.pathLength.patternContentUnits.patternTransform.patternUnits.pointsAtX.pointsAtY.pointsAtZ.preserveAlpha.preserveAspectRatio.primitiveUnits.refX.refY.repeatCount.repeatDur.requiredExtensions.requiredFeatures.specularConstant.specularExponent.spreadMethod.startOffset.stdDeviation.stitchTiles.surfaceScale.systemLanguage.tableValues.targetX.targetY.textLength.viewBox.viewTarget.xChannelSelector.yChannelSelector.zoomAndPan".split(".")).map((e) => [e.toLowerCase(), e])), zt = /* @__PURE__ */ new Map([
	["xlink:actuate", {
		prefix: "xlink",
		name: "actuate",
		namespace: C.XLINK
	}],
	["xlink:arcrole", {
		prefix: "xlink",
		name: "arcrole",
		namespace: C.XLINK
	}],
	["xlink:href", {
		prefix: "xlink",
		name: "href",
		namespace: C.XLINK
	}],
	["xlink:role", {
		prefix: "xlink",
		name: "role",
		namespace: C.XLINK
	}],
	["xlink:show", {
		prefix: "xlink",
		name: "show",
		namespace: C.XLINK
	}],
	["xlink:title", {
		prefix: "xlink",
		name: "title",
		namespace: C.XLINK
	}],
	["xlink:type", {
		prefix: "xlink",
		name: "type",
		namespace: C.XLINK
	}],
	["xml:lang", {
		prefix: "xml",
		name: "lang",
		namespace: C.XML
	}],
	["xml:space", {
		prefix: "xml",
		name: "space",
		namespace: C.XML
	}],
	["xmlns", {
		prefix: "",
		name: "xmlns",
		namespace: C.XMLNS
	}],
	["xmlns:xlink", {
		prefix: "xmlns",
		name: "xlink",
		namespace: C.XMLNS
	}]
]), Bt = new Map((/* @__PURE__ */ "altGlyph.altGlyphDef.altGlyphItem.animateColor.animateMotion.animateTransform.clipPath.feBlend.feColorMatrix.feComponentTransfer.feComposite.feConvolveMatrix.feDiffuseLighting.feDisplacementMap.feDistantLight.feFlood.feFuncA.feFuncB.feFuncG.feFuncR.feGaussianBlur.feImage.feMerge.feMergeNode.feMorphology.feOffset.fePointLight.feSpecularLighting.feSpotLight.feTile.feTurbulence.foreignObject.glyphRef.linearGradient.radialGradient.textPath".split(".")).map((e) => [e.toLowerCase(), e])), Vt = /* @__PURE__ */ new Set([
	D.B,
	D.BIG,
	D.BLOCKQUOTE,
	D.BODY,
	D.BR,
	D.CENTER,
	D.CODE,
	D.DD,
	D.DIV,
	D.DL,
	D.DT,
	D.EM,
	D.EMBED,
	D.H1,
	D.H2,
	D.H3,
	D.H4,
	D.H5,
	D.H6,
	D.HEAD,
	D.HR,
	D.I,
	D.IMG,
	D.LI,
	D.LISTING,
	D.MENU,
	D.META,
	D.NOBR,
	D.OL,
	D.P,
	D.PRE,
	D.RUBY,
	D.S,
	D.SMALL,
	D.SPAN,
	D.STRONG,
	D.STRIKE,
	D.SUB,
	D.SUP,
	D.TABLE,
	D.TT,
	D.U,
	D.UL,
	D.VAR
]);
function Ht(e) {
	let t = e.tagID;
	return t === D.FONT && e.attrs.some(({ name: e }) => e === w.COLOR || e === w.SIZE || e === w.FACE) || Vt.has(t);
}
function Ut(e) {
	for (let t = 0; t < e.attrs.length; t++) if (e.attrs[t].name === It) {
		e.attrs[t].name = Lt;
		break;
	}
}
function Wt(e) {
	for (let t = 0; t < e.attrs.length; t++) {
		let n = Rt.get(e.attrs[t].name);
		n != null && (e.attrs[t].name = n);
	}
}
function Gt(e) {
	for (let t = 0; t < e.attrs.length; t++) {
		let n = zt.get(e.attrs[t].name);
		n && (e.attrs[t].prefix = n.prefix, e.attrs[t].name = n.name, e.attrs[t].namespace = n.namespace);
	}
}
function Kt(e) {
	let t = Bt.get(e.tagName);
	t != null && (e.tagName = t, e.tagID = O(e.tagName));
}
function qt(e, t) {
	return t === C.MATHML && (e === D.MI || e === D.MO || e === D.MN || e === D.MS || e === D.MTEXT);
}
function Jt(e, t, n) {
	if (t === C.MATHML && e === D.ANNOTATION_XML) {
		for (let e = 0; e < n.length; e++) if (n[e].name === w.ENCODING) {
			let t = n[e].value.toLowerCase();
			return t === Ft.TEXT_HTML || t === Ft.APPLICATION_XML;
		}
	}
	return t === C.SVG && (e === D.FOREIGN_OBJECT || e === D.DESC || e === D.TITLE);
}
function Yt(e, t, n, r) {
	return (!r || r === C.HTML) && Jt(e, t, n) || (!r || r === C.MATHML) && qt(e, t);
}
// node_modules/parse5/dist/parser/index.js
var Xt = [
	D.TR,
	D.TBODY,
	D.THEAD,
	D.TFOOT,
	D.CAPTION,
	D.COLGROUP,
	D.TABLE,
	D.FRAMESET,
	D.SELECT,
	D.TEMPLATE,
	D.TD,
	D.TH,
	D.HEAD,
	D.BODY,
	D.HTML
], Zt = "hidden", Qt = [], $t = 8, en = 3, G;
(function(e) {
	e[e.INITIAL = 0] = "INITIAL", e[e.BEFORE_HTML = 1] = "BEFORE_HTML", e[e.BEFORE_HEAD = 2] = "BEFORE_HEAD", e[e.IN_HEAD = 3] = "IN_HEAD", e[e.IN_HEAD_NO_SCRIPT = 4] = "IN_HEAD_NO_SCRIPT", e[e.AFTER_HEAD = 5] = "AFTER_HEAD", e[e.IN_BODY = 6] = "IN_BODY", e[e.TEXT = 7] = "TEXT", e[e.IN_TABLE = 8] = "IN_TABLE", e[e.IN_TABLE_TEXT = 9] = "IN_TABLE_TEXT", e[e.IN_CAPTION = 10] = "IN_CAPTION", e[e.IN_COLUMN_GROUP = 11] = "IN_COLUMN_GROUP", e[e.IN_TABLE_BODY = 12] = "IN_TABLE_BODY", e[e.IN_ROW = 13] = "IN_ROW", e[e.IN_CELL = 14] = "IN_CELL", e[e.IN_SELECT = 15] = "IN_SELECT", e[e.IN_SELECT_IN_TABLE = 16] = "IN_SELECT_IN_TABLE", e[e.IN_TEMPLATE = 17] = "IN_TEMPLATE", e[e.AFTER_BODY = 18] = "AFTER_BODY", e[e.IN_FRAMESET = 19] = "IN_FRAMESET", e[e.AFTER_FRAMESET = 20] = "AFTER_FRAMESET", e[e.AFTER_AFTER_BODY = 21] = "AFTER_AFTER_BODY", e[e.AFTER_AFTER_FRAMESET = 22] = "AFTER_AFTER_FRAMESET";
})(G ||= {});
var tn = {
	startLine: -1,
	startCol: -1,
	startOffset: -1,
	endLine: -1,
	endCol: -1,
	endOffset: -1
}, nn = /* @__PURE__ */ new Set([
	D.TABLE,
	D.TBODY,
	D.TFOOT,
	D.THEAD,
	D.TR
]), rn = {
	scriptingEnabled: !0,
	sourceCodeLocationInfo: !1,
	treeAdapter: W,
	onParseError: null
}, an = class {
	constructor(e, t, n = null, r = null) {
		this.fragmentContext = n, this.scriptHandler = r, this.currentToken = null, this.stopped = !1, this.insertionMode = G.INITIAL, this.originalInsertionMode = G.INITIAL, this.headElement = null, this.formElement = null, this.currentNotInHTML = !1, this.tmplInsertionModeStack = [], this.pendingCharacterTokens = [], this.hasNonWhitespacePendingCharacterToken = !1, this.framesetOk = !0, this.skipNextNewLine = !1, this.fosterParentingEnabled = !1, this.options = {
			...rn,
			...e
		}, this.treeAdapter = this.options.treeAdapter, this.onParseError = this.options.onParseError, this.onParseError && (this.options.sourceCodeLocationInfo = !0), this.document = t ?? this.treeAdapter.createDocument(), this.tokenizer = new st(this.options, this), this.activeFormattingElements = new St(), this.fragmentContextID = n ? O(this.treeAdapter.getTagName(n)) : D.UNKNOWN, this._setContextModes(n ?? this.document, this.fragmentContextID), this.openElements = new bt(this.document, this.treeAdapter, this);
	}
	static parse(e, t) {
		let n = new this(t);
		return n.tokenizer.write(e, !0), n.document;
	}
	static getFragmentParser(e, t) {
		let n = {
			...rn,
			...t
		};
		e ??= n.treeAdapter.createElement(E.TEMPLATE, C.HTML, []);
		let r = n.treeAdapter.createElement("documentmock", C.HTML, []), i = new this(n, r, e);
		return i.fragmentContextID === D.TEMPLATE && i.tmplInsertionModeStack.push(G.IN_TEMPLATE), i._initTokenizerForFragmentParsing(), i._insertFakeRootElement(), i._resetInsertionMode(), i._findFormInFragmentContext(), i;
	}
	getFragment() {
		let e = this.treeAdapter.getFirstChild(this.document), t = this.treeAdapter.createDocumentFragment();
		return this._adoptNodes(e, t), t;
	}
	_err(e, t, n) {
		if (!this.onParseError) return;
		let r = e.location ?? tn, i = {
			code: t,
			startLine: r.startLine,
			startCol: r.startCol,
			startOffset: r.startOffset,
			endLine: n ? r.startLine : r.endLine,
			endCol: n ? r.startCol : r.endCol,
			endOffset: n ? r.startOffset : r.endOffset
		};
		this.onParseError(i);
	}
	onItemPush(e, t, n) {
		var r, i;
		(i = (r = this.treeAdapter).onItemPush) == null || i.call(r, e), n && this.openElements.stackTop > 0 && this._setContextModes(e, t);
	}
	onItemPop(e, t) {
		var n, r, i;
		if (this.options.sourceCodeLocationInfo && this._setEndLocation(e, this.currentToken), (r = (n = this.treeAdapter).onItemPop) == null || r.call(n, e, this.openElements.current), (i = this.annotationXmlIntegrationPoints) == null || i.delete(e), t) {
			let e, t;
			this.openElements.stackTop === 0 && this.fragmentContext ? (e = this.fragmentContext, t = this.fragmentContextID) : {current: e, currentTagId: t} = this.openElements, this._setContextModes(e, t);
		}
	}
	_setContextModes(e, t) {
		let n = e === this.document || e && this.treeAdapter.getNamespaceURI(e) === C.HTML;
		this.currentNotInHTML = !n, this.tokenizer.inForeignNode = !n && e !== void 0 && t !== void 0 && !this._isIntegrationPoint(t, e);
	}
	_switchToTextParsing(e, t) {
		this._insertElement(e, C.HTML), this.tokenizer.state = t, this.originalInsertionMode = this.insertionMode, this.insertionMode = G.TEXT;
	}
	switchToPlaintextParsing() {
		this.insertionMode = G.TEXT, this.originalInsertionMode = G.IN_BODY, this.tokenizer.state = j.PLAINTEXT;
	}
	_getAdjustedCurrentElement() {
		return this.openElements.stackTop === 0 && this.fragmentContext ? this.fragmentContext : this.openElements.current;
	}
	_findFormInFragmentContext() {
		let e = this.fragmentContext;
		for (; e;) {
			if (this.treeAdapter.getTagName(e) === E.FORM && this.treeAdapter.getNamespaceURI(e) === C.HTML) {
				this.formElement = e;
				break;
			}
			e = this.treeAdapter.getParentNode(e);
		}
	}
	_initTokenizerForFragmentParsing() {
		if (this.fragmentContext && this.treeAdapter.getNamespaceURI(this.fragmentContext) === C.HTML) switch (this.fragmentContextID) {
			case D.TITLE:
			case D.TEXTAREA:
				this.tokenizer.state = j.RCDATA;
				break;
			case D.STYLE:
			case D.XMP:
			case D.IFRAME:
			case D.NOEMBED:
			case D.NOFRAMES:
			case D.NOSCRIPT:
				this.tokenizer.state = j.RAWTEXT;
				break;
			case D.SCRIPT:
				this.tokenizer.state = j.SCRIPT_DATA;
				break;
			case D.PLAINTEXT: this.tokenizer.state = j.PLAINTEXT;
		}
	}
	_setDocumentType(e) {
		let t = e.name || "", n = e.publicId || "", r = e.systemId || "";
		if (this.treeAdapter.setDocumentType(this.document, t, n, r), e.location) {
			let t = this.treeAdapter.getChildNodes(this.document).find((e) => this.treeAdapter.isDocumentTypeNode(e));
			t && this.treeAdapter.setNodeSourceCodeLocation(t, e.location);
		}
	}
	_attachElementToTree(e, t, n) {
		if (this.options.sourceCodeLocationInfo) {
			let n = t && {
				...t,
				startTag: t
			};
			this.treeAdapter.setNodeSourceCodeLocation(e, n);
		}
		n.beforeElement ? this.treeAdapter.insertBefore(n.parent, e, n.beforeElement) : this.treeAdapter.appendChild(n.parent, e);
	}
	_getInsertionLocation() {
		return this._shouldFosterParentOnInsertion() ? this._findFosterParentingLocation() : {
			parent: this.openElements.currentTmplContentOrNode ?? this.document,
			beforeElement: null
		};
	}
	_createElement(e, t, n, r) {
		var i, a;
		let o = this.treeAdapter.createElement(e, t, n);
		return (a = (i = this.treeAdapter).onElementCreated) == null || a.call(i, o, {
			intendedParent: r,
			formElement: this.formElement,
			isInTemplate: this.openElements.tmplCount > 0
		}), o;
	}
	_appendElement(e, t) {
		let n = this._getInsertionLocation(), r = this._createElement(e.tagName, t, e.attrs, n.parent);
		this._attachElementToTree(r, e.location, n);
	}
	_insertElement(e, t) {
		let n = this._getInsertionLocation(), r = this._createElement(e.tagName, t, e.attrs, n.parent);
		this._attachElementToTree(r, e.location, n), this.openElements.push(r, e.tagID);
	}
	_insertFakeElement(e, t) {
		let n = this._getInsertionLocation(), r = this._createElement(e, C.HTML, [], n.parent);
		this._attachElementToTree(r, null, n), this.openElements.push(r, t);
	}
	_insertTemplate(e) {
		let t = this._getInsertionLocation(), n = this._createElement(e.tagName, C.HTML, e.attrs, t.parent), r = this.treeAdapter.createDocumentFragment();
		this.treeAdapter.setTemplateContent(n, r), this._attachElementToTree(n, e.location, t), this.openElements.push(n, e.tagID), this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(r, null);
	}
	_insertFakeRootElement() {
		let e = this._createElement(E.HTML, C.HTML, [], this.document);
		this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(e, null), this.treeAdapter.appendChild(this.document, e), this.openElements.push(e, D.HTML);
	}
	_appendCommentNode(e, t) {
		let n = this.treeAdapter.createCommentNode(e.data);
		this.treeAdapter.appendChild(t, n), this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(n, e.location);
	}
	_insertCharacters(e) {
		let t, n;
		if (this._shouldFosterParentOnInsertion() ? ({parent: t, beforeElement: n} = this._findFosterParentingLocation(), n ? this.treeAdapter.insertTextBefore(t, e.chars, n) : this.treeAdapter.insertText(t, e.chars)) : (t = this.openElements.currentTmplContentOrNode, this.treeAdapter.insertText(t, e.chars)), !e.location) return;
		let r = this.treeAdapter.getChildNodes(t), i = r[(n ? r.lastIndexOf(n) : r.length) - 1];
		if (this.treeAdapter.getNodeSourceCodeLocation(i)) {
			let { endLine: t, endCol: n, endOffset: r } = e.location;
			this.treeAdapter.updateNodeSourceCodeLocation(i, {
				endLine: t,
				endCol: n,
				endOffset: r
			});
		} else this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(i, e.location);
	}
	_adoptNodes(e, t) {
		let n = [...this.treeAdapter.getChildNodes(e)];
		for (let e = n.length - 1; e >= 0; e--) this.treeAdapter.detachNode(n[e]);
		for (let e of n) this.treeAdapter.appendChild(t, e);
	}
	_setEndLocation(e, t) {
		if (this.treeAdapter.getNodeSourceCodeLocation(e) && t.location) {
			let n = t.location, r = this.treeAdapter.getTagName(e), i = t.type === d.END_TAG && r === t.tagName ? {
				endTag: { ...n },
				endLine: n.endLine,
				endCol: n.endCol,
				endOffset: n.endOffset
			} : {
				endLine: n.startLine,
				endCol: n.startCol,
				endOffset: n.startOffset
			};
			this.treeAdapter.updateNodeSourceCodeLocation(e, i);
		}
	}
	shouldProcessStartTagTokenInForeignContent(e) {
		if (!this.currentNotInHTML) return !1;
		let t, n;
		return this.openElements.stackTop === 0 && this.fragmentContext ? (t = this.fragmentContext, n = this.fragmentContextID) : {current: t, currentTagId: n} = this.openElements, e.tagID === D.SVG && this.treeAdapter.getTagName(t) === E.ANNOTATION_XML && this.treeAdapter.getNamespaceURI(t) === C.MATHML ? !1 : this.tokenizer.inForeignNode || (e.tagID === D.MGLYPH || e.tagID === D.MALIGNMARK) && n !== void 0 && !this._isIntegrationPoint(n, t, C.HTML);
	}
	_processToken(e) {
		switch (e.type) {
			case d.CHARACTER:
				this.onCharacter(e);
				break;
			case d.NULL_CHARACTER:
				this.onNullCharacter(e);
				break;
			case d.COMMENT:
				this.onComment(e);
				break;
			case d.DOCTYPE:
				this.onDoctype(e);
				break;
			case d.START_TAG:
				this._processStartTag(e);
				break;
			case d.END_TAG:
				this.onEndTag(e);
				break;
			case d.EOF:
				this.onEof(e);
				break;
			case d.WHITESPACE_CHARACTER: this.onWhitespaceCharacter(e);
		}
	}
	_isIntegrationPoint(e, t, n) {
		let r = this.treeAdapter.getNamespaceURI(t);
		if (e === D.ANNOTATION_XML && r === C.MATHML && n !== C.MATHML) {
			let n = this.annotationXmlIntegrationPoints ??= /* @__PURE__ */ new Map(), i = n.get(t);
			return i === void 0 && (i = Yt(e, r, this.treeAdapter.getAttrList(t)), n.set(t, i)), i;
		}
		return Yt(e, r, Qt, n);
	}
	_reconstructActiveFormattingElements() {
		let e = null;
		for (let t = this.activeFormattingElements.newest; t !== null && t.type === U.Element && !this.openElements.contains(t.element); t = t.older) e = t;
		for (let t = e; t !== null && t.type === U.Element; t = t.newer) this._insertElement(t.token, this.treeAdapter.getNamespaceURI(t.element)), this.activeFormattingElements.replaceElement(t, this.openElements.current);
	}
	_closeTableCell() {
		this.openElements.generateImpliedEndTags(), this.openElements.popUntilTableCellPopped(), this.activeFormattingElements.clearToLastMarker(), this.insertionMode = G.IN_ROW;
	}
	_closePElement() {
		this.openElements.generateImpliedEndTagsWithExclusion(D.P), this.openElements.popUntilTagNamePopped(D.P);
	}
	_resetInsertionMode() {
		let e = this.openElements.indexOfTopmostOf(Xt), t = e === 0 && this.fragmentContext ? this.fragmentContextID : this.openElements.tagIDs[e], n = e === 0 && this.fragmentContext ? this.fragmentContext : this.openElements.items[e];
		if (n !== void 0 && this.treeAdapter.getNamespaceURI(n) === C.HTML) switch (t) {
			case D.TR:
				this.insertionMode = G.IN_ROW;
				return;
			case D.TBODY:
			case D.THEAD:
			case D.TFOOT:
				this.insertionMode = G.IN_TABLE_BODY;
				return;
			case D.CAPTION:
				this.insertionMode = G.IN_CAPTION;
				return;
			case D.COLGROUP:
				this.insertionMode = G.IN_COLUMN_GROUP;
				return;
			case D.TABLE:
				this.insertionMode = G.IN_TABLE;
				return;
			case D.BODY:
				this.insertionMode = G.IN_BODY;
				return;
			case D.FRAMESET:
				this.insertionMode = G.IN_FRAMESET;
				return;
			case D.SELECT:
				this._resetInsertionModeForSelect(e);
				return;
			case D.TEMPLATE:
				this.insertionMode = this.tmplInsertionModeStack[this.tmplInsertionModeStack.length - 1];
				return;
			case D.HTML:
				this.insertionMode = this.headElement ? G.AFTER_HEAD : G.BEFORE_HEAD;
				return;
			case D.TD:
			case D.TH:
				if (e > 0) {
					this.insertionMode = G.IN_CELL;
					return;
				}
				break;
			case D.HEAD: if (e > 0) {
				this.insertionMode = G.IN_HEAD;
				return;
			}
		}
		this.insertionMode = G.IN_BODY;
	}
	_resetInsertionModeForSelect(e) {
		if (e > 0) {
			let e = this.openElements.indexOfTopmost(D.TABLE);
			if (e > 0 && e > this.openElements.indexOfTopmost(D.TEMPLATE)) {
				this.insertionMode = G.IN_SELECT_IN_TABLE;
				return;
			}
		}
		this.insertionMode = G.IN_SELECT;
	}
	_isElementCausesFosterParenting(e) {
		return nn.has(e);
	}
	_shouldFosterParentOnInsertion() {
		return this.fosterParentingEnabled && this.openElements.currentTagId !== void 0 && this._isElementCausesFosterParenting(this.openElements.currentTagId);
	}
	_findFosterParentingLocation() {
		let { openElements: e } = this, t = e.indexOfTopmost(D.TABLE), n = e.indexOfTopmost(D.TEMPLATE);
		if (n > t) return {
			parent: this.treeAdapter.getTemplateContent(e.items[n]),
			beforeElement: null
		};
		if (t !== -1) {
			let n = e.items[t], r = this.treeAdapter.getParentNode(n);
			return r ? {
				parent: r,
				beforeElement: n
			} : {
				parent: e.items[e.slotBelow(t)],
				beforeElement: null
			};
		}
		return {
			parent: e.items[0],
			beforeElement: null
		};
	}
	_fosterParentElement(e) {
		let t = this._findFosterParentingLocation();
		t.beforeElement ? this.treeAdapter.insertBefore(t.parent, e, t.beforeElement) : this.treeAdapter.appendChild(t.parent, e);
	}
	_isSpecialElement(e, t) {
		return Ze[this.treeAdapter.getNamespaceURI(e)].has(t);
	}
	onCharacter(e) {
		if (this.skipNextNewLine = !1, this.tokenizer.inForeignNode) hi(this, e);
		else switch (this.insertionMode) {
			case G.INITIAL:
				K(this, e);
				break;
			case G.BEFORE_HTML:
				q(this, e);
				break;
			case G.BEFORE_HEAD:
				J(this, e);
				break;
			case G.IN_HEAD:
				Cn(this, e);
				break;
			case G.IN_HEAD_NO_SCRIPT:
				En(this, e);
				break;
			case G.AFTER_HEAD:
				kn(this, e);
				break;
			case G.IN_BODY:
			case G.IN_CAPTION:
			case G.IN_CELL:
			case G.IN_TEMPLATE:
				Mn(this, e);
				break;
			case G.TEXT:
			case G.IN_SELECT:
			case G.IN_SELECT_IN_TABLE:
				this._insertCharacters(e);
				break;
			case G.IN_TABLE:
			case G.IN_TABLE_BODY:
			case G.IN_ROW:
				Er(this, e);
				break;
			case G.IN_TABLE_TEXT:
				Rr(this, e);
				break;
			case G.IN_COLUMN_GROUP:
				Wr(this, e);
				break;
			case G.AFTER_BODY:
				oi(this, e);
				break;
			case G.AFTER_AFTER_BODY: fi(this, e);
		}
	}
	onNullCharacter(e) {
		if (this.skipNextNewLine = !1, this.tokenizer.inForeignNode) mi(this, e);
		else switch (this.insertionMode) {
			case G.INITIAL:
				K(this, e);
				break;
			case G.BEFORE_HTML:
				q(this, e);
				break;
			case G.BEFORE_HEAD:
				J(this, e);
				break;
			case G.IN_HEAD:
				Cn(this, e);
				break;
			case G.IN_HEAD_NO_SCRIPT:
				En(this, e);
				break;
			case G.AFTER_HEAD:
				kn(this, e);
				break;
			case G.TEXT:
				this._insertCharacters(e);
				break;
			case G.IN_TABLE:
			case G.IN_TABLE_BODY:
			case G.IN_ROW:
				Er(this, e);
				break;
			case G.IN_COLUMN_GROUP:
				Wr(this, e);
				break;
			case G.AFTER_BODY:
				oi(this, e);
				break;
			case G.AFTER_AFTER_BODY: fi(this, e);
		}
	}
	onComment(e) {
		if (this.skipNextNewLine = !1, this.currentNotInHTML) pn(this, e);
		else switch (this.insertionMode) {
			case G.INITIAL:
			case G.BEFORE_HTML:
			case G.BEFORE_HEAD:
			case G.IN_HEAD:
			case G.IN_HEAD_NO_SCRIPT:
			case G.AFTER_HEAD:
			case G.IN_BODY:
			case G.IN_TABLE:
			case G.IN_CAPTION:
			case G.IN_COLUMN_GROUP:
			case G.IN_TABLE_BODY:
			case G.IN_ROW:
			case G.IN_CELL:
			case G.IN_SELECT:
			case G.IN_SELECT_IN_TABLE:
			case G.IN_TEMPLATE:
			case G.IN_FRAMESET:
			case G.AFTER_FRAMESET:
				pn(this, e);
				break;
			case G.IN_TABLE_TEXT:
				$(this, e);
				break;
			case G.AFTER_BODY:
				mn(this, e);
				break;
			case G.AFTER_AFTER_BODY:
			case G.AFTER_AFTER_FRAMESET: hn(this, e);
		}
	}
	onDoctype(e) {
		switch (this.skipNextNewLine = !1, this.insertionMode) {
			case G.INITIAL:
				_n(this, e);
				break;
			case G.BEFORE_HEAD:
			case G.IN_HEAD:
			case G.IN_HEAD_NO_SCRIPT:
			case G.AFTER_HEAD:
				this._err(e, c.misplacedDoctype);
				break;
			case G.IN_TABLE_TEXT: $(this, e);
		}
	}
	onStartTag(e) {
		this.skipNextNewLine = !1, this.currentToken = e, this._processStartTag(e), e.selfClosing && !e.ackSelfClosing && this._err(e, c.nonVoidHtmlElementStartTagWithTrailingSolidus);
	}
	_processStartTag(e) {
		this.shouldProcessStartTagTokenInForeignContent(e) ? _i(this, e) : this._startTagOutsideForeignContent(e);
	}
	_startTagOutsideForeignContent(e) {
		switch (this.insertionMode) {
			case G.INITIAL:
				K(this, e);
				break;
			case G.BEFORE_HTML:
				vn(this, e);
				break;
			case G.BEFORE_HEAD:
				bn(this, e);
				break;
			case G.IN_HEAD:
				Y(this, e);
				break;
			case G.IN_HEAD_NO_SCRIPT:
				wn(this, e);
				break;
			case G.AFTER_HEAD:
				Dn(this, e);
				break;
			case G.IN_BODY:
				Z(this, e);
				break;
			case G.IN_TABLE:
				Q(this, e);
				break;
			case G.IN_TABLE_TEXT:
				$(this, e);
				break;
			case G.IN_CAPTION:
				Br(this, e);
				break;
			case G.IN_COLUMN_GROUP:
				Hr(this, e);
				break;
			case G.IN_TABLE_BODY:
				Gr(this, e);
				break;
			case G.IN_ROW:
				qr(this, e);
				break;
			case G.IN_CELL:
				Yr(this, e);
				break;
			case G.IN_SELECT:
				Zr(this, e);
				break;
			case G.IN_SELECT_IN_TABLE:
				$r(this, e);
				break;
			case G.IN_TEMPLATE:
				ti(this, e);
				break;
			case G.AFTER_BODY:
				ii(this, e);
				break;
			case G.IN_FRAMESET:
				si(this, e);
				break;
			case G.AFTER_FRAMESET:
				li(this, e);
				break;
			case G.AFTER_AFTER_BODY:
				di(this, e);
				break;
			case G.AFTER_AFTER_FRAMESET: pi(this, e);
		}
	}
	onEndTag(e) {
		this.skipNextNewLine = !1, this.currentToken = e, this.currentNotInHTML ? vi(this, e) : this._endTagOutsideForeignContent(e);
	}
	_endTagOutsideForeignContent(e) {
		switch (this.insertionMode) {
			case G.INITIAL:
				K(this, e);
				break;
			case G.BEFORE_HTML:
				yn(this, e);
				break;
			case G.BEFORE_HEAD:
				xn(this, e);
				break;
			case G.IN_HEAD:
				Sn(this, e);
				break;
			case G.IN_HEAD_NO_SCRIPT:
				Tn(this, e);
				break;
			case G.AFTER_HEAD:
				On(this, e);
				break;
			case G.IN_BODY:
				Sr(this, e);
				break;
			case G.TEXT:
				wr(this, e);
				break;
			case G.IN_TABLE:
				Fr(this, e);
				break;
			case G.IN_TABLE_TEXT:
				$(this, e);
				break;
			case G.IN_CAPTION:
				Vr(this, e);
				break;
			case G.IN_COLUMN_GROUP:
				Ur(this, e);
				break;
			case G.IN_TABLE_BODY:
				Kr(this, e);
				break;
			case G.IN_ROW:
				Jr(this, e);
				break;
			case G.IN_CELL:
				Xr(this, e);
				break;
			case G.IN_SELECT:
				Qr(this, e);
				break;
			case G.IN_SELECT_IN_TABLE:
				ei(this, e);
				break;
			case G.IN_TEMPLATE:
				ni(this, e);
				break;
			case G.AFTER_BODY:
				ai(this, e);
				break;
			case G.IN_FRAMESET:
				ci(this, e);
				break;
			case G.AFTER_FRAMESET:
				ui(this, e);
				break;
			case G.AFTER_AFTER_BODY: fi(this, e);
		}
	}
	onEof(e) {
		switch (this.insertionMode) {
			case G.INITIAL:
				K(this, e);
				break;
			case G.BEFORE_HTML:
				q(this, e);
				break;
			case G.BEFORE_HEAD:
				J(this, e);
				break;
			case G.IN_HEAD:
				Cn(this, e);
				break;
			case G.IN_HEAD_NO_SCRIPT:
				En(this, e);
				break;
			case G.AFTER_HEAD:
				kn(this, e);
				break;
			case G.IN_BODY:
			case G.IN_TABLE:
			case G.IN_CAPTION:
			case G.IN_COLUMN_GROUP:
			case G.IN_TABLE_BODY:
			case G.IN_ROW:
			case G.IN_CELL:
			case G.IN_SELECT:
			case G.IN_SELECT_IN_TABLE:
				Cr(this, e);
				break;
			case G.TEXT:
				Tr(this, e);
				break;
			case G.IN_TABLE_TEXT:
				$(this, e);
				break;
			case G.IN_TEMPLATE:
				ri(this, e);
				break;
			case G.AFTER_BODY:
			case G.IN_FRAMESET:
			case G.AFTER_FRAMESET:
			case G.AFTER_AFTER_BODY:
			case G.AFTER_AFTER_FRAMESET: gn(this, e);
		}
	}
	onWhitespaceCharacter(e) {
		if (this.skipNextNewLine && (this.skipNextNewLine = !1, e.chars.charCodeAt(0) === t.LINE_FEED)) {
			if (e.chars.length === 1) return;
			e.chars = e.chars.substr(1);
		}
		if (this.tokenizer.inForeignNode) this._insertCharacters(e);
		else switch (this.insertionMode) {
			case G.IN_HEAD:
			case G.IN_HEAD_NO_SCRIPT:
			case G.AFTER_HEAD:
			case G.TEXT:
			case G.IN_COLUMN_GROUP:
			case G.IN_SELECT:
			case G.IN_SELECT_IN_TABLE:
			case G.IN_FRAMESET:
			case G.AFTER_FRAMESET:
				this._insertCharacters(e);
				break;
			case G.IN_BODY:
			case G.IN_CAPTION:
			case G.IN_CELL:
			case G.IN_TEMPLATE:
			case G.AFTER_BODY:
			case G.AFTER_AFTER_BODY:
			case G.AFTER_AFTER_FRAMESET:
				jn(this, e);
				break;
			case G.IN_TABLE:
			case G.IN_TABLE_BODY:
			case G.IN_ROW:
				Er(this, e);
				break;
			case G.IN_TABLE_TEXT: Lr(this, e);
		}
	}
};
function on(e, t) {
	let n = e.activeFormattingElements.getElementEntryInScopeWithTagName(t.tagName);
	return n ? e.openElements.contains(n.element) ? e.openElements.hasInScope(t.tagID, n.element) || (n = null) : (e.activeFormattingElements.removeEntry(n), n = null) : xr(e, t), n;
}
function sn(e, t) {
	let { openElements: n } = e, r = n._indexOf(t.element);
	for (let t = n.slotAbove(r); t !== -1; t = n.slotAbove(t)) if (e._isSpecialElement(n.items[t], n.tagIDs[t])) return t;
	return n.shortenToLength(r), e.activeFormattingElements.removeEntry(t), -1;
}
function cn(e, t, n) {
	let r = e.openElements.items[t], i = r, a = e.openElements.slotBelow(t), o = e.openElements.getCommonAncestor(n);
	for (let t = 0, s = a; e.openElements.items[s] !== n; t++, s = a) {
		let n = e.openElements.items[s];
		a = e.openElements.slotBelow(s);
		let c = e.activeFormattingElements.getElementEntry(n), l = c && t >= en;
		!c || l ? (l && e.activeFormattingElements.removeEntry(c), e.openElements.removeAt(s)) : (n = ln(e, c, o), i === r && (e.activeFormattingElements.bookmark = c), e.treeAdapter.detachNode(i), e.treeAdapter.appendChild(n, i), i = n);
	}
	return i;
}
function ln(e, t, n) {
	let r = e.treeAdapter.getNamespaceURI(t.element), i = e._createElement(t.token.tagName, r, t.token.attrs, n);
	return e.openElements.replace(t.element, i), e.activeFormattingElements.replaceElement(t, i), i;
}
function un(e, t, n) {
	let r = O(e.treeAdapter.getTagName(t));
	if (e._isElementCausesFosterParenting(r)) e._fosterParentElement(n);
	else {
		let i = e.treeAdapter.getNamespaceURI(t);
		r === D.TEMPLATE && i === C.HTML && (t = e.treeAdapter.getTemplateContent(t)), e.treeAdapter.appendChild(t, n);
	}
}
function dn(e, t, n) {
	let r = e.treeAdapter.getNamespaceURI(n.element), { token: i } = n, a = e._createElement(i.tagName, r, i.attrs, t);
	e._adoptNodes(t, a), e.treeAdapter.appendChild(t, a), e.activeFormattingElements.insertElementAfterBookmark(a, i), e.activeFormattingElements.removeEntry(n);
	let o = e.openElements._indexOf(n.element), s = e.openElements.slotAbove(o);
	for (; e.openElements.items[s] !== t;) s = e.openElements.slotAbove(s);
	e.openElements.replaceFormattingElement(o, s, a, i.tagID);
}
function fn(e, t) {
	let { current: n, currentTagId: r } = e.openElements;
	if (r === t.tagID && e.treeAdapter.getNamespaceURI(n) === C.HTML && !e.activeFormattingElements.getElementEntry(n)) e.openElements.pop();
	else for (let n = 0; n < $t; n++) {
		let n = on(e, t);
		if (!n) break;
		let r = sn(e, n);
		if (r === -1) break;
		let i = e.openElements.items[r];
		e.activeFormattingElements.bookmark = n;
		let a = cn(e, r, n.element), o = e.openElements.getCommonAncestor(n.element);
		e.treeAdapter.detachNode(a), o && un(e, o, a), dn(e, i, n);
	}
}
function pn(e, t) {
	e._appendCommentNode(t, e.openElements.currentTmplContentOrNode);
}
function mn(e, t) {
	e._appendCommentNode(t, e.openElements.items[0]);
}
function hn(e, t) {
	e._appendCommentNode(t, e.document);
}
function gn(e, t) {
	if (e.stopped = !0, t.location) {
		let n = e.fragmentContext ? 0 : 2;
		for (let r = e.openElements.stackTop; r >= n; r = e.openElements.slotBelow(r)) e._setEndLocation(e.openElements.items[r], t);
		if (!e.fragmentContext && e.openElements.stackTop >= 0) {
			let n = e.openElements.items[0], r = e.treeAdapter.getNodeSourceCodeLocation(n);
			if (r && !r.endTag && (e._setEndLocation(n, t), e.openElements.stackTop >= 1)) {
				let n = e.openElements.items[1], r = e.treeAdapter.getNodeSourceCodeLocation(n);
				r && !r.endTag && e._setEndLocation(n, t);
			}
		}
	}
}
function _n(e, t) {
	e._setDocumentType(t);
	let n = t.forceQuirks ? T.QUIRKS : Pt(t);
	Nt(t) || e._err(t, c.nonConformingDoctype), e.treeAdapter.setDocumentMode(e.document, n), e.insertionMode = G.BEFORE_HTML;
}
function K(e, t) {
	e._err(t, c.missingDoctype, !0), e.treeAdapter.setDocumentMode(e.document, T.QUIRKS), e.insertionMode = G.BEFORE_HTML, e._processToken(t);
}
function vn(e, t) {
	t.tagID === D.HTML ? (e._insertElement(t, C.HTML), e.insertionMode = G.BEFORE_HEAD) : q(e, t);
}
function yn(e, t) {
	let n = t.tagID;
	(n === D.HTML || n === D.HEAD || n === D.BODY || n === D.BR) && q(e, t);
}
function q(e, t) {
	e._insertFakeRootElement(), e.insertionMode = G.BEFORE_HEAD, e._processToken(t);
}
function bn(e, t) {
	switch (t.tagID) {
		case D.HTML:
			Z(e, t);
			break;
		case D.HEAD:
			e._insertElement(t, C.HTML), e.headElement = e.openElements.current, e.insertionMode = G.IN_HEAD;
			break;
		default: J(e, t);
	}
}
function xn(e, t) {
	let n = t.tagID;
	n === D.HEAD || n === D.BODY || n === D.HTML || n === D.BR ? J(e, t) : e._err(t, c.endTagWithoutMatchingOpenElement);
}
function J(e, t) {
	e._insertFakeElement(E.HEAD, D.HEAD), e.headElement = e.openElements.current, e.insertionMode = G.IN_HEAD, e._processToken(t);
}
function Y(e, t) {
	switch (t.tagID) {
		case D.HTML:
			Z(e, t);
			break;
		case D.BASE:
		case D.BASEFONT:
		case D.BGSOUND:
		case D.LINK:
		case D.META:
			e._appendElement(t, C.HTML), t.ackSelfClosing = !0;
			break;
		case D.TITLE:
			e._switchToTextParsing(t, j.RCDATA);
			break;
		case D.NOSCRIPT:
			e.options.scriptingEnabled ? e._switchToTextParsing(t, j.RAWTEXT) : (e._insertElement(t, C.HTML), e.insertionMode = G.IN_HEAD_NO_SCRIPT);
			break;
		case D.NOFRAMES:
		case D.STYLE:
			e._switchToTextParsing(t, j.RAWTEXT);
			break;
		case D.SCRIPT:
			e._switchToTextParsing(t, j.SCRIPT_DATA);
			break;
		case D.TEMPLATE:
			e._insertTemplate(t), e.activeFormattingElements.insertMarker(), e.framesetOk = !1, e.insertionMode = G.IN_TEMPLATE, e.tmplInsertionModeStack.push(G.IN_TEMPLATE);
			break;
		case D.HEAD:
			e._err(t, c.misplacedStartTagForHeadElement);
			break;
		default: Cn(e, t);
	}
}
function Sn(e, t) {
	switch (t.tagID) {
		case D.HEAD:
			e.openElements.pop(), e.insertionMode = G.AFTER_HEAD;
			break;
		case D.BODY:
		case D.BR:
		case D.HTML:
			Cn(e, t);
			break;
		case D.TEMPLATE:
			X(e, t);
			break;
		default: e._err(t, c.endTagWithoutMatchingOpenElement);
	}
}
function X(e, t) {
	e.openElements.tmplCount > 0 ? (e.openElements.generateImpliedEndTagsThoroughly(), e.openElements.currentTagId !== D.TEMPLATE && e._err(t, c.closingOfElementWithOpenChildElements), e.openElements.popUntilTagNamePopped(D.TEMPLATE), e.activeFormattingElements.clearToLastMarker(), e.tmplInsertionModeStack.pop(), e._resetInsertionMode()) : e._err(t, c.endTagWithoutMatchingOpenElement);
}
function Cn(e, t) {
	e.openElements.pop(), e.insertionMode = G.AFTER_HEAD, e._processToken(t);
}
function wn(e, t) {
	switch (t.tagID) {
		case D.HTML:
			Z(e, t);
			break;
		case D.BASEFONT:
		case D.BGSOUND:
		case D.HEAD:
		case D.LINK:
		case D.META:
		case D.NOFRAMES:
		case D.STYLE:
			Y(e, t);
			break;
		case D.NOSCRIPT:
			e._err(t, c.nestedNoscriptInHead);
			break;
		default: En(e, t);
	}
}
function Tn(e, t) {
	switch (t.tagID) {
		case D.NOSCRIPT:
			e.openElements.pop(), e.insertionMode = G.IN_HEAD;
			break;
		case D.BR:
			En(e, t);
			break;
		default: e._err(t, c.endTagWithoutMatchingOpenElement);
	}
}
function En(e, t) {
	let n = t.type === d.EOF ? c.openElementsLeftAfterEof : c.disallowedContentInNoscriptInHead;
	e._err(t, n), e.openElements.pop(), e.insertionMode = G.IN_HEAD, e._processToken(t);
}
function Dn(e, t) {
	switch (t.tagID) {
		case D.HTML:
			Z(e, t);
			break;
		case D.BODY:
			e._insertElement(t, C.HTML), e.framesetOk = !1, e.insertionMode = G.IN_BODY;
			break;
		case D.FRAMESET:
			e._insertElement(t, C.HTML), e.insertionMode = G.IN_FRAMESET;
			break;
		case D.BASE:
		case D.BASEFONT:
		case D.BGSOUND:
		case D.LINK:
		case D.META:
		case D.NOFRAMES:
		case D.SCRIPT:
		case D.STYLE:
		case D.TEMPLATE:
		case D.TITLE:
			e._err(t, c.abandonedHeadElementChild), e.openElements.push(e.headElement, D.HEAD), Y(e, t), e.openElements.remove(e.headElement);
			break;
		case D.HEAD:
			e._err(t, c.misplacedStartTagForHeadElement);
			break;
		default: kn(e, t);
	}
}
function On(e, t) {
	switch (t.tagID) {
		case D.BODY:
		case D.HTML:
		case D.BR:
			kn(e, t);
			break;
		case D.TEMPLATE:
			X(e, t);
			break;
		default: e._err(t, c.endTagWithoutMatchingOpenElement);
	}
}
function kn(e, t) {
	e._insertFakeElement(E.BODY, D.BODY), e.insertionMode = G.IN_BODY, An(e, t);
}
function An(e, t) {
	switch (t.type) {
		case d.CHARACTER:
			Mn(e, t);
			break;
		case d.WHITESPACE_CHARACTER:
			jn(e, t);
			break;
		case d.COMMENT:
			pn(e, t);
			break;
		case d.START_TAG:
			Z(e, t);
			break;
		case d.END_TAG:
			Sr(e, t);
			break;
		case d.EOF: Cr(e, t);
	}
}
function jn(e, t) {
	e._reconstructActiveFormattingElements(), e._insertCharacters(t);
}
function Mn(e, t) {
	e._reconstructActiveFormattingElements(), e._insertCharacters(t), e.framesetOk = !1;
}
function Nn(e, t) {
	e.openElements.tmplCount === 0 && e.treeAdapter.adoptAttributes(e.openElements.items[0], t.attrs);
}
function Pn(e, t) {
	let n = e.openElements.tryPeekProperlyNestedBodyElement();
	n && e.openElements.tmplCount === 0 && (e.framesetOk = !1, e.treeAdapter.adoptAttributes(n, t.attrs));
}
function Fn(e, t) {
	let n = e.openElements.tryPeekProperlyNestedBodyElement();
	e.framesetOk && n && (e.treeAdapter.detachNode(n), e.openElements.popAllUpToHtmlElement(), e._insertElement(t, C.HTML), e.insertionMode = G.IN_FRAMESET);
}
function In(e, t) {
	e.openElements.hasInButtonScope(D.P) && e._closePElement(), e._insertElement(t, C.HTML);
}
function Ln(e, t) {
	e.openElements.hasInButtonScope(D.P) && e._closePElement(), e.openElements.currentTagId !== void 0 && Qe.has(e.openElements.currentTagId) && e.openElements.pop(), e._insertElement(t, C.HTML);
}
function Rn(e, t) {
	e.openElements.hasInButtonScope(D.P) && e._closePElement(), e._insertElement(t, C.HTML), e.skipNextNewLine = !0, e.framesetOk = !1;
}
function zn(e, t) {
	let n = e.openElements.tmplCount > 0;
	(!e.formElement || n) && (e.openElements.hasInButtonScope(D.P) && e._closePElement(), e._insertElement(t, C.HTML), n || (e.formElement = e.openElements.current));
}
function Bn(e, t) {
	e.framesetOk = !1;
	let n = t.tagID === D.LI ? e.openElements.indexOfTopmost(D.LI) : Math.max(e.openElements.indexOfTopmost(D.DD), e.openElements.indexOfTopmost(D.DT));
	if (n !== -1 && !e.openElements.hasListItemBoundaryAbove(n)) {
		let t = e.openElements.tagIDs[n];
		e.openElements.generateImpliedEndTagsWithExclusion(t), e.openElements.popUntilTagNamePopped(t);
	}
	e.openElements.hasInButtonScope(D.P) && e._closePElement(), e._insertElement(t, C.HTML);
}
function Vn(e, t) {
	e.openElements.hasInButtonScope(D.P) && e._closePElement(), e._insertElement(t, C.HTML), e.tokenizer.state = j.PLAINTEXT;
}
function Hn(e, t) {
	e.openElements.hasInScope(D.BUTTON) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(D.BUTTON)), e._reconstructActiveFormattingElements(), e._insertElement(t, C.HTML), e.framesetOk = !1;
}
function Un(e, t) {
	let n = e.activeFormattingElements.getElementEntryInScopeWithTagName(E.A);
	n && (fn(e, t), e.openElements.remove(n.element), e.activeFormattingElements.removeEntry(n)), e._reconstructActiveFormattingElements(), e._insertElement(t, C.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function Wn(e, t) {
	e._reconstructActiveFormattingElements(), e._insertElement(t, C.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function Gn(e, t) {
	e._reconstructActiveFormattingElements(), e.openElements.hasInScope(D.NOBR) && (fn(e, t), e._reconstructActiveFormattingElements()), e._insertElement(t, C.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function Kn(e, t) {
	e._reconstructActiveFormattingElements(), e._insertElement(t, C.HTML), e.activeFormattingElements.insertMarker(), e.framesetOk = !1;
}
function qn(e, t) {
	e.treeAdapter.getDocumentMode(e.document) !== T.QUIRKS && e.openElements.hasInButtonScope(D.P) && e._closePElement(), e._insertElement(t, C.HTML), e.framesetOk = !1, e.insertionMode = G.IN_TABLE;
}
function Jn(e, t) {
	e._reconstructActiveFormattingElements(), e._appendElement(t, C.HTML), e.framesetOk = !1, t.ackSelfClosing = !0;
}
function Yn(e) {
	let t = f(e, w.TYPE);
	return t != null && t.toLowerCase() === Zt;
}
function Xn(e, t) {
	e._reconstructActiveFormattingElements(), e._appendElement(t, C.HTML), Yn(t) || (e.framesetOk = !1), t.ackSelfClosing = !0;
}
function Zn(e, t) {
	e._appendElement(t, C.HTML), t.ackSelfClosing = !0;
}
function Qn(e, t) {
	e.openElements.hasInButtonScope(D.P) && e._closePElement(), e._appendElement(t, C.HTML), e.framesetOk = !1, t.ackSelfClosing = !0;
}
function $n(e, t) {
	t.tagName = E.IMG, t.tagID = D.IMG, Jn(e, t);
}
function er(e, t) {
	e._insertElement(t, C.HTML), e.skipNextNewLine = !0, e.tokenizer.state = j.RCDATA, e.originalInsertionMode = e.insertionMode, e.framesetOk = !1, e.insertionMode = G.TEXT;
}
function tr(e, t) {
	e.openElements.hasInButtonScope(D.P) && e._closePElement(), e._reconstructActiveFormattingElements(), e.framesetOk = !1, e._switchToTextParsing(t, j.RAWTEXT);
}
function nr(e, t) {
	e.framesetOk = !1, e._switchToTextParsing(t, j.RAWTEXT);
}
function rr(e, t) {
	e._switchToTextParsing(t, j.RAWTEXT);
}
function ir(e, t) {
	e._reconstructActiveFormattingElements(), e._insertElement(t, C.HTML), e.framesetOk = !1, e.insertionMode = e.insertionMode === G.IN_TABLE || e.insertionMode === G.IN_CAPTION || e.insertionMode === G.IN_TABLE_BODY || e.insertionMode === G.IN_ROW || e.insertionMode === G.IN_CELL ? G.IN_SELECT_IN_TABLE : G.IN_SELECT;
}
function ar(e, t) {
	e.openElements.currentTagId === D.OPTION && e.openElements.pop(), e._reconstructActiveFormattingElements(), e._insertElement(t, C.HTML);
}
function or(e, t) {
	e.openElements.hasInScope(D.RUBY) && e.openElements.generateImpliedEndTags(), e._insertElement(t, C.HTML);
}
function sr(e, t) {
	e.openElements.hasInScope(D.RUBY) && e.openElements.generateImpliedEndTagsWithExclusion(D.RTC), e._insertElement(t, C.HTML);
}
function cr(e, t) {
	e._reconstructActiveFormattingElements(), Ut(t), Gt(t), t.selfClosing ? e._appendElement(t, C.MATHML) : e._insertElement(t, C.MATHML), t.ackSelfClosing = !0;
}
function lr(e, t) {
	e._reconstructActiveFormattingElements(), Wt(t), Gt(t), t.selfClosing ? e._appendElement(t, C.SVG) : e._insertElement(t, C.SVG), t.ackSelfClosing = !0;
}
function ur(e, t) {
	e._reconstructActiveFormattingElements(), e._insertElement(t, C.HTML);
}
function Z(e, t) {
	switch (t.tagID) {
		case D.I:
		case D.S:
		case D.B:
		case D.U:
		case D.EM:
		case D.TT:
		case D.BIG:
		case D.CODE:
		case D.FONT:
		case D.SMALL:
		case D.STRIKE:
		case D.STRONG:
			Wn(e, t);
			break;
		case D.A:
			Un(e, t);
			break;
		case D.H1:
		case D.H2:
		case D.H3:
		case D.H4:
		case D.H5:
		case D.H6:
			Ln(e, t);
			break;
		case D.P:
		case D.DL:
		case D.OL:
		case D.UL:
		case D.DIV:
		case D.DIR:
		case D.NAV:
		case D.MAIN:
		case D.MENU:
		case D.ASIDE:
		case D.CENTER:
		case D.FIGURE:
		case D.FOOTER:
		case D.HEADER:
		case D.HGROUP:
		case D.DIALOG:
		case D.DETAILS:
		case D.ADDRESS:
		case D.ARTICLE:
		case D.SEARCH:
		case D.SECTION:
		case D.SUMMARY:
		case D.FIELDSET:
		case D.BLOCKQUOTE:
		case D.FIGCAPTION:
			In(e, t);
			break;
		case D.LI:
		case D.DD:
		case D.DT:
			Bn(e, t);
			break;
		case D.BR:
		case D.IMG:
		case D.WBR:
		case D.AREA:
		case D.EMBED:
		case D.KEYGEN:
			Jn(e, t);
			break;
		case D.HR:
			Qn(e, t);
			break;
		case D.RB:
		case D.RTC:
			or(e, t);
			break;
		case D.RT:
		case D.RP:
			sr(e, t);
			break;
		case D.PRE:
		case D.LISTING:
			Rn(e, t);
			break;
		case D.XMP:
			tr(e, t);
			break;
		case D.SVG:
			lr(e, t);
			break;
		case D.HTML:
			Nn(e, t);
			break;
		case D.BASE:
		case D.LINK:
		case D.META:
		case D.STYLE:
		case D.TITLE:
		case D.SCRIPT:
		case D.BGSOUND:
		case D.BASEFONT:
		case D.TEMPLATE:
			Y(e, t);
			break;
		case D.BODY:
			Pn(e, t);
			break;
		case D.FORM:
			zn(e, t);
			break;
		case D.NOBR:
			Gn(e, t);
			break;
		case D.MATH:
			cr(e, t);
			break;
		case D.TABLE:
			qn(e, t);
			break;
		case D.INPUT:
			Xn(e, t);
			break;
		case D.PARAM:
		case D.TRACK:
		case D.SOURCE:
			Zn(e, t);
			break;
		case D.IMAGE:
			$n(e, t);
			break;
		case D.BUTTON:
			Hn(e, t);
			break;
		case D.APPLET:
		case D.OBJECT:
		case D.MARQUEE:
			Kn(e, t);
			break;
		case D.IFRAME:
			nr(e, t);
			break;
		case D.SELECT:
			ir(e, t);
			break;
		case D.OPTION:
		case D.OPTGROUP:
			ar(e, t);
			break;
		case D.NOEMBED:
		case D.NOFRAMES:
			rr(e, t);
			break;
		case D.FRAMESET:
			Fn(e, t);
			break;
		case D.TEXTAREA:
			er(e, t);
			break;
		case D.NOSCRIPT:
			e.options.scriptingEnabled ? rr(e, t) : ur(e, t);
			break;
		case D.PLAINTEXT:
			Vn(e, t);
			break;
		case D.COL:
		case D.TH:
		case D.TD:
		case D.TR:
		case D.HEAD:
		case D.FRAME:
		case D.TBODY:
		case D.TFOOT:
		case D.THEAD:
		case D.CAPTION:
		case D.COLGROUP: break;
		default: ur(e, t);
	}
}
function dr(e, t) {
	if (e.openElements.hasInScope(D.BODY) && (e.insertionMode = G.AFTER_BODY, e.options.sourceCodeLocationInfo)) {
		let n = e.openElements.tryPeekProperlyNestedBodyElement();
		n && e._setEndLocation(n, t);
	}
}
function fr(e, t) {
	e.openElements.hasInScope(D.BODY) && (e.insertionMode = G.AFTER_BODY, ai(e, t));
}
function pr(e, t) {
	let n = t.tagID;
	e.openElements.hasInScope(n) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(n));
}
function mr(e) {
	let t = e.openElements.tmplCount > 0, { formElement: n } = e;
	t || (e.formElement = null), (n || t) && e.openElements.hasInScope(D.FORM) && (e.openElements.generateImpliedEndTags(), t ? e.openElements.popUntilTagNamePopped(D.FORM) : n && e.openElements.remove(n));
}
function hr(e) {
	e.openElements.hasInButtonScope(D.P) || e._insertFakeElement(E.P, D.P), e._closePElement();
}
function gr(e) {
	e.openElements.hasInListItemScope(D.LI) && (e.openElements.generateImpliedEndTagsWithExclusion(D.LI), e.openElements.popUntilTagNamePopped(D.LI));
}
function _r(e, t) {
	let n = t.tagID;
	e.openElements.hasInScope(n) && (e.openElements.generateImpliedEndTagsWithExclusion(n), e.openElements.popUntilTagNamePopped(n));
}
function vr(e) {
	e.openElements.hasNumberedHeaderInScope() && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilNumberedHeaderPopped());
}
function yr(e, t) {
	let n = t.tagID;
	e.openElements.hasInScope(n) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(n), e.activeFormattingElements.clearToLastMarker());
}
function br(e) {
	e._reconstructActiveFormattingElements(), e._insertFakeElement(E.BR, D.BR), e.openElements.pop(), e.framesetOk = !1;
}
function xr(e, t) {
	let n = t.tagID, r = n === D.UNKNOWN ? e.openElements.indexOfTopmostByName(C.HTML, t.tagName) : e.openElements.indexOfTopmost(n);
	r > 0 && !e.openElements.hasSpecialElementAbove(r) && (e.openElements.generateImpliedEndTagsWithExclusion(n), e.openElements.stackTop >= r && e.openElements.shortenToLength(r));
}
function Sr(e, t) {
	switch (t.tagID) {
		case D.A:
		case D.B:
		case D.I:
		case D.S:
		case D.U:
		case D.EM:
		case D.TT:
		case D.BIG:
		case D.CODE:
		case D.FONT:
		case D.NOBR:
		case D.SMALL:
		case D.STRIKE:
		case D.STRONG:
			fn(e, t);
			break;
		case D.P:
			hr(e);
			break;
		case D.DL:
		case D.UL:
		case D.OL:
		case D.DIR:
		case D.DIV:
		case D.NAV:
		case D.PRE:
		case D.MAIN:
		case D.MENU:
		case D.ASIDE:
		case D.BUTTON:
		case D.CENTER:
		case D.FIGURE:
		case D.FOOTER:
		case D.HEADER:
		case D.HGROUP:
		case D.DIALOG:
		case D.ADDRESS:
		case D.ARTICLE:
		case D.DETAILS:
		case D.SEARCH:
		case D.SECTION:
		case D.SUMMARY:
		case D.LISTING:
		case D.FIELDSET:
		case D.BLOCKQUOTE:
		case D.FIGCAPTION:
			pr(e, t);
			break;
		case D.LI:
			gr(e);
			break;
		case D.DD:
		case D.DT:
			_r(e, t);
			break;
		case D.H1:
		case D.H2:
		case D.H3:
		case D.H4:
		case D.H5:
		case D.H6:
			vr(e);
			break;
		case D.BR:
			br(e);
			break;
		case D.BODY:
			dr(e, t);
			break;
		case D.HTML:
			fr(e, t);
			break;
		case D.FORM:
			mr(e);
			break;
		case D.APPLET:
		case D.OBJECT:
		case D.MARQUEE:
			yr(e, t);
			break;
		case D.TEMPLATE:
			X(e, t);
			break;
		default: xr(e, t);
	}
}
function Cr(e, t) {
	e.tmplInsertionModeStack.length > 0 ? ri(e, t) : gn(e, t);
}
function wr(e, t) {
	var n;
	t.tagID === D.SCRIPT && ((n = e.scriptHandler) == null || n.call(e, e.openElements.current)), e.openElements.pop(), e.insertionMode = e.originalInsertionMode;
}
function Tr(e, t) {
	e._err(t, c.eofInElementThatCanContainOnlyText), e.openElements.pop(), e.insertionMode = e.originalInsertionMode, e.onEof(t);
}
function Er(e, t) {
	if (e.openElements.currentTagId !== void 0 && nn.has(e.openElements.currentTagId)) switch (e.pendingCharacterTokens.length = 0, e.hasNonWhitespacePendingCharacterToken = !1, e.originalInsertionMode = e.insertionMode, e.insertionMode = G.IN_TABLE_TEXT, t.type) {
		case d.CHARACTER:
			Rr(e, t);
			break;
		case d.WHITESPACE_CHARACTER: Lr(e, t);
	}
	else Ir(e, t);
}
function Dr(e, t) {
	e.openElements.clearBackToTableContext(), e.activeFormattingElements.insertMarker(), e._insertElement(t, C.HTML), e.insertionMode = G.IN_CAPTION;
}
function Or(e, t) {
	e.openElements.clearBackToTableContext(), e._insertElement(t, C.HTML), e.insertionMode = G.IN_COLUMN_GROUP;
}
function kr(e, t) {
	e.openElements.clearBackToTableContext(), e._insertFakeElement(E.COLGROUP, D.COLGROUP), e.insertionMode = G.IN_COLUMN_GROUP, Hr(e, t);
}
function Ar(e, t) {
	e.openElements.clearBackToTableContext(), e._insertElement(t, C.HTML), e.insertionMode = G.IN_TABLE_BODY;
}
function jr(e, t) {
	e.openElements.clearBackToTableContext(), e._insertFakeElement(E.TBODY, D.TBODY), e.insertionMode = G.IN_TABLE_BODY, Gr(e, t);
}
function Mr(e, t) {
	e.openElements.hasInTableScope(D.TABLE) && (e.openElements.popUntilTagNamePopped(D.TABLE), e._resetInsertionMode(), e._processStartTag(t));
}
function Nr(e, t) {
	Yn(t) ? e._appendElement(t, C.HTML) : Ir(e, t), t.ackSelfClosing = !0;
}
function Pr(e, t) {
	!e.formElement && e.openElements.tmplCount === 0 && (e._insertElement(t, C.HTML), e.formElement = e.openElements.current, e.openElements.pop());
}
function Q(e, t) {
	switch (t.tagID) {
		case D.TD:
		case D.TH:
		case D.TR:
			jr(e, t);
			break;
		case D.STYLE:
		case D.SCRIPT:
		case D.TEMPLATE:
			Y(e, t);
			break;
		case D.COL:
			kr(e, t);
			break;
		case D.FORM:
			Pr(e, t);
			break;
		case D.TABLE:
			Mr(e, t);
			break;
		case D.TBODY:
		case D.TFOOT:
		case D.THEAD:
			Ar(e, t);
			break;
		case D.INPUT:
			Nr(e, t);
			break;
		case D.CAPTION:
			Dr(e, t);
			break;
		case D.COLGROUP:
			Or(e, t);
			break;
		default: Ir(e, t);
	}
}
function Fr(e, t) {
	switch (t.tagID) {
		case D.TABLE:
			e.openElements.hasInTableScope(D.TABLE) && (e.openElements.popUntilTagNamePopped(D.TABLE), e._resetInsertionMode());
			break;
		case D.TEMPLATE:
			X(e, t);
			break;
		case D.BODY:
		case D.CAPTION:
		case D.COL:
		case D.COLGROUP:
		case D.HTML:
		case D.TBODY:
		case D.TD:
		case D.TFOOT:
		case D.TH:
		case D.THEAD:
		case D.TR: break;
		default: Ir(e, t);
	}
}
function Ir(e, t) {
	let n = e.fosterParentingEnabled;
	e.fosterParentingEnabled = !0, An(e, t), e.fosterParentingEnabled = n;
}
function Lr(e, t) {
	e.pendingCharacterTokens.push(t);
}
function Rr(e, t) {
	e.pendingCharacterTokens.push(t), e.hasNonWhitespacePendingCharacterToken = !0;
}
function $(e, t) {
	let n = 0;
	if (e.hasNonWhitespacePendingCharacterToken) for (; n < e.pendingCharacterTokens.length; n++) Ir(e, e.pendingCharacterTokens[n]);
	else for (; n < e.pendingCharacterTokens.length; n++) e._insertCharacters(e.pendingCharacterTokens[n]);
	e.insertionMode = e.originalInsertionMode, e._processToken(t);
}
var zr = /* @__PURE__ */ new Set([
	D.CAPTION,
	D.COL,
	D.COLGROUP,
	D.TBODY,
	D.TD,
	D.TFOOT,
	D.TH,
	D.THEAD,
	D.TR
]);
function Br(e, t) {
	let n = t.tagID;
	zr.has(n) ? e.openElements.hasInTableScope(D.CAPTION) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(D.CAPTION), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = G.IN_TABLE, Q(e, t)) : Z(e, t);
}
function Vr(e, t) {
	let n = t.tagID;
	switch (n) {
		case D.CAPTION:
		case D.TABLE:
			e.openElements.hasInTableScope(D.CAPTION) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(D.CAPTION), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = G.IN_TABLE, n === D.TABLE && Fr(e, t));
			break;
		case D.BODY:
		case D.COL:
		case D.COLGROUP:
		case D.HTML:
		case D.TBODY:
		case D.TD:
		case D.TFOOT:
		case D.TH:
		case D.THEAD:
		case D.TR: break;
		default: Sr(e, t);
	}
}
function Hr(e, t) {
	switch (t.tagID) {
		case D.HTML:
			Z(e, t);
			break;
		case D.COL:
			e._appendElement(t, C.HTML), t.ackSelfClosing = !0;
			break;
		case D.TEMPLATE:
			Y(e, t);
			break;
		default: Wr(e, t);
	}
}
function Ur(e, t) {
	switch (t.tagID) {
		case D.COLGROUP:
			e.openElements.currentTagId === D.COLGROUP && (e.openElements.pop(), e.insertionMode = G.IN_TABLE);
			break;
		case D.TEMPLATE:
			X(e, t);
			break;
		case D.COL: break;
		default: Wr(e, t);
	}
}
function Wr(e, t) {
	e.openElements.currentTagId === D.COLGROUP && (e.openElements.pop(), e.insertionMode = G.IN_TABLE, e._processToken(t));
}
function Gr(e, t) {
	switch (t.tagID) {
		case D.TR:
			e.openElements.clearBackToTableBodyContext(), e._insertElement(t, C.HTML), e.insertionMode = G.IN_ROW;
			break;
		case D.TH:
		case D.TD:
			e.openElements.clearBackToTableBodyContext(), e._insertFakeElement(E.TR, D.TR), e.insertionMode = G.IN_ROW, qr(e, t);
			break;
		case D.CAPTION:
		case D.COL:
		case D.COLGROUP:
		case D.TBODY:
		case D.TFOOT:
		case D.THEAD:
			e.openElements.hasTableBodyContextInTableScope() && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = G.IN_TABLE, Q(e, t));
			break;
		default: Q(e, t);
	}
}
function Kr(e, t) {
	let n = t.tagID;
	switch (t.tagID) {
		case D.TBODY:
		case D.TFOOT:
		case D.THEAD:
			e.openElements.hasInTableScope(n) && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = G.IN_TABLE);
			break;
		case D.TABLE:
			e.openElements.hasTableBodyContextInTableScope() && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = G.IN_TABLE, Fr(e, t));
			break;
		case D.BODY:
		case D.CAPTION:
		case D.COL:
		case D.COLGROUP:
		case D.HTML:
		case D.TD:
		case D.TH:
		case D.TR: break;
		default: Fr(e, t);
	}
}
function qr(e, t) {
	switch (t.tagID) {
		case D.TH:
		case D.TD:
			e.openElements.clearBackToTableRowContext(), e._insertElement(t, C.HTML), e.insertionMode = G.IN_CELL, e.activeFormattingElements.insertMarker();
			break;
		case D.CAPTION:
		case D.COL:
		case D.COLGROUP:
		case D.TBODY:
		case D.TFOOT:
		case D.THEAD:
		case D.TR:
			e.openElements.hasInTableScope(D.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = G.IN_TABLE_BODY, Gr(e, t));
			break;
		default: Q(e, t);
	}
}
function Jr(e, t) {
	switch (t.tagID) {
		case D.TR:
			e.openElements.hasInTableScope(D.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = G.IN_TABLE_BODY);
			break;
		case D.TABLE:
			e.openElements.hasInTableScope(D.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = G.IN_TABLE_BODY, Kr(e, t));
			break;
		case D.TBODY:
		case D.TFOOT:
		case D.THEAD:
			(e.openElements.hasInTableScope(t.tagID) || e.openElements.hasInTableScope(D.TR)) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = G.IN_TABLE_BODY, Kr(e, t));
			break;
		case D.BODY:
		case D.CAPTION:
		case D.COL:
		case D.COLGROUP:
		case D.HTML:
		case D.TD:
		case D.TH: break;
		default: Fr(e, t);
	}
}
function Yr(e, t) {
	let n = t.tagID;
	zr.has(n) ? (e.openElements.hasInTableScope(D.TD) || e.openElements.hasInTableScope(D.TH)) && (e._closeTableCell(), qr(e, t)) : Z(e, t);
}
function Xr(e, t) {
	let n = t.tagID;
	switch (n) {
		case D.TD:
		case D.TH:
			e.openElements.hasInTableScope(n) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(n), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = G.IN_ROW);
			break;
		case D.TABLE:
		case D.TBODY:
		case D.TFOOT:
		case D.THEAD:
		case D.TR:
			e.openElements.hasInTableScope(n) && (e._closeTableCell(), Jr(e, t));
			break;
		case D.BODY:
		case D.CAPTION:
		case D.COL:
		case D.COLGROUP:
		case D.HTML: break;
		default: Sr(e, t);
	}
}
function Zr(e, t) {
	switch (t.tagID) {
		case D.HTML:
			Z(e, t);
			break;
		case D.OPTION:
			e.openElements.currentTagId === D.OPTION && e.openElements.pop(), e._insertElement(t, C.HTML);
			break;
		case D.OPTGROUP:
			e.openElements.currentTagId === D.OPTION && e.openElements.pop(), e.openElements.currentTagId === D.OPTGROUP && e.openElements.pop(), e._insertElement(t, C.HTML);
			break;
		case D.HR:
			e.openElements.currentTagId === D.OPTION && e.openElements.pop(), e.openElements.currentTagId === D.OPTGROUP && e.openElements.pop(), e._appendElement(t, C.HTML), t.ackSelfClosing = !0;
			break;
		case D.INPUT:
		case D.KEYGEN:
		case D.TEXTAREA:
		case D.SELECT:
			e.openElements.hasInSelectScope(D.SELECT) && (e.openElements.popUntilTagNamePopped(D.SELECT), e._resetInsertionMode(), t.tagID !== D.SELECT && e._processStartTag(t));
			break;
		case D.SCRIPT:
		case D.TEMPLATE: Y(e, t);
	}
}
function Qr(e, t) {
	switch (t.tagID) {
		case D.OPTGROUP:
			e.openElements.stackTop > 0 && e.openElements.currentTagId === D.OPTION && e.openElements.tagIDs[e.openElements.slotBelow(e.openElements.stackTop)] === D.OPTGROUP && e.openElements.pop(), e.openElements.currentTagId === D.OPTGROUP && e.openElements.pop();
			break;
		case D.OPTION:
			e.openElements.currentTagId === D.OPTION && e.openElements.pop();
			break;
		case D.SELECT:
			e.openElements.hasInSelectScope(D.SELECT) && (e.openElements.popUntilTagNamePopped(D.SELECT), e._resetInsertionMode());
			break;
		case D.TEMPLATE: X(e, t);
	}
}
function $r(e, t) {
	let n = t.tagID;
	n === D.CAPTION || n === D.TABLE || n === D.TBODY || n === D.TFOOT || n === D.THEAD || n === D.TR || n === D.TD || n === D.TH ? (e.openElements.popUntilTagNamePopped(D.SELECT), e._resetInsertionMode(), e._processStartTag(t)) : Zr(e, t);
}
function ei(e, t) {
	let n = t.tagID;
	n === D.CAPTION || n === D.TABLE || n === D.TBODY || n === D.TFOOT || n === D.THEAD || n === D.TR || n === D.TD || n === D.TH ? e.openElements.hasInTableScope(n) && (e.openElements.popUntilTagNamePopped(D.SELECT), e._resetInsertionMode(), e.onEndTag(t)) : Qr(e, t);
}
function ti(e, t) {
	switch (t.tagID) {
		case D.BASE:
		case D.BASEFONT:
		case D.BGSOUND:
		case D.LINK:
		case D.META:
		case D.NOFRAMES:
		case D.SCRIPT:
		case D.STYLE:
		case D.TEMPLATE:
		case D.TITLE:
			Y(e, t);
			break;
		case D.CAPTION:
		case D.COLGROUP:
		case D.TBODY:
		case D.TFOOT:
		case D.THEAD:
			e.tmplInsertionModeStack[e.tmplInsertionModeStack.length - 1] = G.IN_TABLE, e.insertionMode = G.IN_TABLE, Q(e, t);
			break;
		case D.COL:
			e.tmplInsertionModeStack[e.tmplInsertionModeStack.length - 1] = G.IN_COLUMN_GROUP, e.insertionMode = G.IN_COLUMN_GROUP, Hr(e, t);
			break;
		case D.TR:
			e.tmplInsertionModeStack[e.tmplInsertionModeStack.length - 1] = G.IN_TABLE_BODY, e.insertionMode = G.IN_TABLE_BODY, Gr(e, t);
			break;
		case D.TD:
		case D.TH:
			e.tmplInsertionModeStack[e.tmplInsertionModeStack.length - 1] = G.IN_ROW, e.insertionMode = G.IN_ROW, qr(e, t);
			break;
		default: e.tmplInsertionModeStack[e.tmplInsertionModeStack.length - 1] = G.IN_BODY, e.insertionMode = G.IN_BODY, Z(e, t);
	}
}
function ni(e, t) {
	t.tagID === D.TEMPLATE && X(e, t);
}
function ri(e, t) {
	if (e.openElements.tmplCount > 0) {
		do
			e.openElements.popUntilTagNamePopped(D.TEMPLATE), e.activeFormattingElements.clearToLastMarker(), e.tmplInsertionModeStack.pop();
		while (e.openElements.tmplCount > 0);
		e._resetInsertionMode(), e.onEof(t);
	} else gn(e, t);
}
function ii(e, t) {
	t.tagID === D.HTML ? Z(e, t) : oi(e, t);
}
function ai(e, t) {
	if (t.tagID === D.HTML) {
		if (e.fragmentContext || (e.insertionMode = G.AFTER_AFTER_BODY), e.options.sourceCodeLocationInfo && e.openElements.tagIDs[0] === D.HTML) {
			e._setEndLocation(e.openElements.items[0], t);
			let n = e.openElements.items[1];
			n && !e.treeAdapter.getNodeSourceCodeLocation(n)?.endTag && e._setEndLocation(n, t);
		}
	} else oi(e, t);
}
function oi(e, t) {
	e.insertionMode = G.IN_BODY, An(e, t);
}
function si(e, t) {
	switch (t.tagID) {
		case D.HTML:
			Z(e, t);
			break;
		case D.FRAMESET:
			e._insertElement(t, C.HTML);
			break;
		case D.FRAME:
			e._appendElement(t, C.HTML), t.ackSelfClosing = !0;
			break;
		case D.NOFRAMES: Y(e, t);
	}
}
function ci(e, t) {
	t.tagID === D.FRAMESET && !e.openElements.isRootHtmlElementCurrent() && (e.openElements.pop(), !e.fragmentContext && e.openElements.currentTagId !== D.FRAMESET && (e.insertionMode = G.AFTER_FRAMESET));
}
function li(e, t) {
	switch (t.tagID) {
		case D.HTML:
			Z(e, t);
			break;
		case D.NOFRAMES: Y(e, t);
	}
}
function ui(e, t) {
	t.tagID === D.HTML && (e.insertionMode = G.AFTER_AFTER_FRAMESET);
}
function di(e, t) {
	t.tagID === D.HTML ? Z(e, t) : fi(e, t);
}
function fi(e, t) {
	e.insertionMode = G.IN_BODY, An(e, t);
}
function pi(e, t) {
	switch (t.tagID) {
		case D.HTML:
			Z(e, t);
			break;
		case D.NOFRAMES: Y(e, t);
	}
}
function mi(e, t) {
	t.chars = "�", e._insertCharacters(t);
}
function hi(e, t) {
	e._insertCharacters(t), e.framesetOk = !1;
}
function gi(e) {
	for (; e.treeAdapter.getNamespaceURI(e.openElements.current) !== C.HTML && e.openElements.currentTagId !== void 0 && !e._isIntegrationPoint(e.openElements.currentTagId, e.openElements.current);) e.openElements.pop();
}
function _i(e, t) {
	if (Ht(t)) gi(e), e._startTagOutsideForeignContent(t);
	else {
		let n = e._getAdjustedCurrentElement(), r = e.treeAdapter.getNamespaceURI(n);
		r === C.MATHML ? Ut(t) : r === C.SVG && (Kt(t), Wt(t)), Gt(t), t.selfClosing ? e._appendElement(t, r) : e._insertElement(t, r), t.ackSelfClosing = !0;
	}
}
function vi(e, t) {
	if (t.tagID === D.P || t.tagID === D.BR) {
		gi(e), e._endTagOutsideForeignContent(t);
		return;
	}
	if (e.openElements.stackTop === 0) return;
	let { tagName: n } = t, r = Bt.get(n), i = e.fragmentContext ? e.treeAdapter.getNamespaceURI(e.fragmentContext) : C.HTML, a = Math.max(e.openElements.indexOfTopmostByName(C.SVG, n), e.openElements.indexOfTopmostByName(C.MATHML, n), r === void 0 ? -1 : e.openElements.indexOfTopmostByName(C.SVG, r), i === C.HTML || i === C.SVG || i === C.MATHML ? -1 : e.openElements.indexOfTopmostByName(i, n));
	a > e.openElements.indexOfTopmostHtmlElement() ? (t.tagName = e.treeAdapter.getTagName(e.openElements.items[a]), e.openElements.shortenToLength(a)) : e._endTagOutsideForeignContent(t);
}
E.AREA, E.BASE, E.BASEFONT, E.BGSOUND, E.BR, E.COL, E.EMBED, E.FRAME, E.HR, E.IMG, E.INPUT, E.KEYGEN, E.LINK, E.META, E.PARAM, E.SOURCE, E.TRACK, E.WBR;
// node_modules/parse5/dist/index.js
function yi(e, t) {
	return an.parse(e, t);
}
export { ze as a, O as i, an as n, d as o, W as r, yi as t };
