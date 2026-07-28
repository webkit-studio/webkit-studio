# QA Round 1 — staging screenshots: FAILED (staging URL unreachable from this environment)

Date: 2026-07-28
Target: https://webkit-studio.webflow.io/audit
Tooling: Playwright 1.56.1, Chromium (headless, `--force-prefers-reduced-motion`), viewports 390 / 768 / 1440 x 900, deviceScaleFactor 1

## What happened

No screenshots could be taken. The staging host is **blocked by the sandbox's egress
proxy policy** — the connection is refused before any HTTP request reaches Webflow.

Exact failures:

| Tool | Attempt | Result |
| --- | --- | --- |
| curl | `GET https://webkit-studio.webflow.io/audit` | `curl: (56) CONNECT tunnel failed, response 403` (no HTTP status from the site — TLS tunnel never established) |
| Playwright/Chromium | `page.goto(...)` at widths 390, 768, 1440 | `net::ERR_TUNNEL_CONNECTION_FAILED` (all three attempts, identical) |
| Server-side WebFetch | `GET https://webkit-studio.webflow.io/audit` | `HTTP 403 Forbidden` (same for a control fetch of `example.com`, i.e. the 403 comes from the egress policy, not from Webflow) |

Proxy diagnostic (`$HTTPS_PROXY/__agentproxy/status`) logged for every attempt:

```
kind: connect_rejected
detail: gateway answered 403 to CONNECT (policy denial or upstream failure)
host: webkit-studio.webflow.io:443
```

The proxy README classifies this as an organization egress-policy denial:
"The destination host is not allowed by your organization's egress policy for this
session. Do not retry or route around it — report the blocked host."
Other external hosts (`webflow.com`, `api.webflow.com`, `cdn.jsdelivr.net`,
`google.com`) are rejected the same way, so this is a general external-web block
for the session, not something specific to the staging subdomain.

## Checklist results (all blocked by the above)

- **HTTP status of the page:** none obtained — TLS CONNECT rejected with 403 by the egress proxy; the request never reached Webflow. No evidence the site itself is down.
- **window.gsap loaded:** could not check (page never loaded).
- **#au-chart exists:** could not check.
- **[data-au-demo] exists:** could not check.
- **.faq_list exists:** could not check.
- **Console errors:** none captured (page never loaded; the only failure was the network-level tunnel rejection).
- **Horizontal overflow (scrollWidth vs clientWidth) at 390 / 768 / 1440:** could not measure.

## Missing artifacts

The following planned files could not be produced:
`staging-390.png`, `staging-768.png`, `staging-1440.png`,
`staging-1440-hero.png`, `staging-1440-cena.png`, `staging-1440-objednavka.png`.

## How to unblock

Allow `webkit-studio.webflow.io:443` (and ideally `*.webflow.io`, `*.website-files.com`
for assets) in the session's egress proxy policy, then re-run this QA round.
