export default function (s: any) {
    var t: any = void 0;
    if (Array.isArray(s)) {
        if (s.length > 0) {
            var div = document.createElement("div");
            s.forEach((function (t) {
                if (uHttpUrl(t)) {
                    var iframe = document.createElement("iframe");
                    iframe.width = "494", iframe.height = "278", iframe.frameBorder = "0", iframe.src = t, iframe.allow = "accelerometer; encrypted-media; gyroscope; picture-in-picture", iframe.allowFullscreen = !0, div.append(iframe)
                }
            })), t = div.children.length > 0 ? div.children : void 0
        }
    } else if (void 0 !== s && uHttpUrl(s)) {
        var iframe = document.createElement("iframe");
        iframe.width = "494", iframe.height = "278", iframe.frameBorder = "0", iframe.src = s, iframe.allow = "accelerometer; encrypted-media; gyroscope; picture-in-picture", iframe.allowFullscreen = !0, t = iframe
    }
    return t
}