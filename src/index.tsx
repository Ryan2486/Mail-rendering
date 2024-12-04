import { render } from "@react-email/render";
import express from "express";
import { z } from "zod";
import LicenseReportEmaail from "./email.js";

const app = express();
const PORT = process.env.PORT || 8082;

app.use(express.json());

const SoftwareLicenseDashboardSchema = z.object({
	name: z.string(),
	allocated: z.number(),
	used: z.number(),
	expiryDate: z.any().transform((date) => new Date(date)), // Transformation de la date
	historicalData: z.array(
		z.object({
			date: z.any().transform((date) => new Date(date)), // Transformation de la date
			used: z.number(),
		})
	),
	anomaly: z.array(z.string()),
	prediction: z.number(),
});

const validation = z.array(SoftwareLicenseDashboardSchema);

app.post("/render", async (req, res) => {
	try {
		console.log(req.body);
		const data: any[] = validation.parse(req.body);

		// Rendu du HTML
		const html = await render(<LicenseReportEmaail data={data} />);
		res.send(html);
	} catch (error) {
		console.error("Erreur de rendu:", error);
		res.status(500).json({ error: "Erreur de rendu du template" });
	}
});

app.listen(PORT, () => {
	console.log(`🚀 Serveur de rendu d'e-mails démarré sur le port ${PORT}`);
});
