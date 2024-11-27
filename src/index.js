/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// export default {
// 	async fetch(request, env, ctx) {
// 		return new Response('Hello World!');
// 	},
// };

export default {
	async fetch(request) {
	  if (request.method === "POST") {
		const data = await request.json();
  
		// Format email content
		const emailContent = `
		  From: ${data.name} <${data.email}>
		  Message: ${data.message}
		`;
  
		// Create email forwarding request
		const response = await fetch("https://api.mailchannels.net/tx/v1/send", {
		  method: "POST",
		  headers: { "Content-Type": "application/json" },
		  body: JSON.stringify({
			personalizations: [
			  {
				to: [{ email: "info@kentknowsme.com" }],
			  },
			],
			from: { email: data.email, name: data.name },
			subject: "New Form Submission",
			content: [{ type: "text/plain", value: emailContent }],
		  }),
		});
  
		if (response.ok) {
		  return new Response("Message sent successfully!", { status: 200 });
		} else {
		  return new Response("Failed to send message.", { status: 500 });
		}
	  }
	  return new Response("Not Found", { status: 404 });
	},
  };
  
