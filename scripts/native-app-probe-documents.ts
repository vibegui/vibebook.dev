/** Neither document knows the read marker. Only a tools/call response for the
 * exact readonly request id can put canonical message text in #result. */
export function appProbeDocument(
  stage: "initial" | "replacement",
  hostOrigin: string,
  destination?: string,
) {
  return `<!doctype html><meta charset="utf-8"><title>Controlled ${stage} room app</title>
<p id="stage">${stage}</p><output id="result" data-outcome="pending" data-initialize="pending"></output>
${destination ? '<button id="navigate">Navigate same frame</button>' : ""}
<script>
const output = document.getElementById('result'), readId = ${stage === "initial" ? 101 : 201};
let sent = false;
function send(method, params, id) { parent.postMessage({jsonrpc:'2.0',method,params,...(id === undefined ? {} : {id})}, '*'); }
function read() { if(sent) return; sent=true; send('tools/call',{name:'vibebook_read',arguments:{limit:1}},readId); }
addEventListener('message',event=>{
  if(event.source!==parent || event.origin!==${JSON.stringify(hostOrigin)} || !event.data || event.data.jsonrpc!=='2.0') return;
  const value=event.data;
  if(value.id===1) {
    output.dataset.initialize=value.error?'refused':'answered';
    if(!value.error) send('ui/notifications/initialized',{});
    read();
  }
  if(value.id!==readId) return;
  if(value.error || value.result?.isError) { output.dataset.errorCode=typeof value.error?.code==='number'?String(value.error.code):'tool-error';output.dataset.outcome='refused';return; }
  const messages=value.result?.structuredContent?.messages;
  if(Array.isArray(messages) && typeof messages[0]?.text==='string') {output.textContent=messages[0].text;output.dataset.outcome='read';}
  else output.dataset.outcome='unexpected';
});
${destination ? `document.getElementById('navigate').onclick=()=>{location.href=${JSON.stringify(destination)}};` : ""}
send('ui/initialize',{appInfo:{name:'controlled-navigation-probe',version:'1'},appCapabilities:{},protocolVersion:'2026-01-26'},1);
// The replacement also probes the inherited session if renegotiation is silent;
// handshake silence alone never proves denial of the actual read capability.
${stage === "replacement" ? "setTimeout(read,2000);" : ""}
setTimeout(()=>{if(output.dataset.outcome==='pending')output.dataset.outcome='timeout';},15000);
</script>`;
}


export const REVIEW_DENY_DOCUMENT = '<!doctype html><meta charset="utf-8"><title>Controlled review denial</title><p>Known synthetic external-provider DENY control.</p>';
