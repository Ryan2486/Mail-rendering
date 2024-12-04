import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Html,
	Img,
	Preview,
	Section,
	Tailwind,
	Text,
} from "@react-email/components";
import { addMonths, format, isBefore } from "date-fns";
import { useEffect, useState } from "react";

interface SoftwareLicenseDashboard {
	name: string;
	used: number;
	allocated: number;
	expiryDate: Date;
	prediction: number;
	historicalData: { date: Date; used: number }[];
	anomaly?: string[];
}

interface props {
	data: SoftwareLicenseDashboard[];
}

export const ModernLicenseReportEmail = ({ data }: props) => {
	const [datastate, setData] = useState<SoftwareLicenseDashboard[]>(data);
	const getUsageForDate = (data: SoftwareLicenseDashboard, date: Date) => {
		const historicalUsage = data.historicalData.find(
			(data) => data.date.getTime() === date.getTime()
		);
		return historicalUsage ? historicalUsage.used : data.used;
	};
	useEffect(() => {
		setData(data);
	}, [data]);

	const getAnomalyColor = (anomaly: string) => {
		switch (anomaly) {
			case "overused":
				return "bg-red-100 text-red-700";
			case "underused":
				return "bg-blue-100 text-blue-700";
			case "expiredsoon":
				return "bg-yellow-100 text-yellow-700";
			case "stronggrowth":
				return "bg-green-100 text-green-700";
			case "strongdecrease":
				return "bg-purple-100 text-purple-700";
			default:
				return "bg-gray-100 text-gray-700";
		}
	};

	return (
		<Html>
			<Head />
			<Preview>
				Rapport de Licences Logicielles - Résumé et Recommandations
			</Preview>
			<Tailwind>
				<Body className="bg-gray-50 font-sans">
					<Container className="mx-auto py-8 px-4">
						<Img
							src="https://example.com/logo.png"
							width="150"
							height="50"
							alt="Logo de l'entreprise"
							className="mb-6"
						/>
						<Heading as="h1" className="text-3xl font-bold mb-6 text-gray-800">
							Rapport de Licences Logicielles
						</Heading>

						<Section className="mb-8 bg-white rounded-lg shadow-sm p-6">
							<Heading
								as="h2"
								className="text-2xl font-semibold mb-4 text-gray-700">
								Vue d'ensemble
							</Heading>
							<table className="w-full border-collapse">
								<thead>
									<tr>
										<th className="bg-gray-100 p-3 text-left rounded-tl-lg">
											Logiciel
										</th>
										<th className="bg-gray-100 p-3 text-left">
											Licences allouées
										</th>
										<th className="bg-gray-100 p-3 text-left rounded-tr-lg">
											Licences utilisées
										</th>
									</tr>
								</thead>
								<tbody>
									{datastate?.map((item, index) => (
										<tr
											key={index}
											className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
											<td className="p-3 border-t">{item.name}</td>
											<td className="p-3 border-t">{item.allocated}</td>
											<td className="p-3 border-t">{item.used}</td>
										</tr>
									))}
								</tbody>
							</table>
						</Section>

						<Section className="mb-8 bg-white rounded-lg shadow-sm p-6">
							<Heading
								as="h2"
								className="text-2xl font-semibold mb-4 text-gray-700">
								Anomalies
							</Heading>
							<table className="w-full border-collapse">
								<thead>
									<tr>
										<th className="bg-gray-100 p-3 text-left rounded-tl-lg">
											Licences
										</th>
										<th className="bg-gray-100 p-3 text-left rounded-tr-lg">
											Anomalie
										</th>
									</tr>
								</thead>
								<tbody>
									{datastate?.map(
										(item, index) =>
											item.anomaly &&
											item.anomaly.length > 0 && (
												<tr
													key={index}
													className={
														index % 2 === 0 ? "bg-gray-50" : "bg-white"
													}>
													<td className="p-3 border-t">{item.name}</td>
													<td className="p-3 border-t">
														{item.anomaly.map((anomaly) => (
															<Text
																key={anomaly}
																className={`${getAnomalyColor(
																	anomaly
																)} px-3 py-1 rounded-full mr-2 inline-block text-sm`}>
																{anomaly === "overused"
																	? "Surutilisation"
																	: anomaly === "underused"
																	? "Sous-utilisation"
																	: anomaly === "expiredsoon"
																	? "Expiration imminente"
																	: anomaly === "stronggrowth"
																	? "Croissance forte"
																	: anomaly === "strongdecrease"
																	? "Diminution forte"
																	: ""}
															</Text>
														))}
													</td>
												</tr>
											)
									)}
								</tbody>
							</table>
						</Section>

						<Section className="mb-8 bg-white rounded-lg shadow-sm p-6">
							<Heading
								as="h2"
								className="text-2xl font-semibold mb-4 text-gray-700">
								Prédictions
							</Heading>
							<table className="w-full border-collapse">
								<thead>
									<tr>
										<th className="bg-gray-100 p-3 text-left rounded-tl-lg">
											Logiciel
										</th>
										<th className="bg-gray-100 p-3 text-left">
											Utilisation actuelle
										</th>
										<th className="bg-gray-100 p-3 text-left">
											Prédiction à 1 an
										</th>
										<th className="bg-gray-100 p-3 text-left rounded-tr-lg">
											Évolution
										</th>
									</tr>
								</thead>
								<tbody>
									{datastate?.map((item, index) => {
										const evolution = item.prediction - item.used;
										return (
											<tr
												key={index}
												className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
												<td className="p-3 border-t">{item.name}</td>
												<td className="p-3 border-t">{item.used}</td>
												<td className="p-3 border-t">{item.prediction}</td>
												<td
													className={`p-3 border-t ${
														evolution > 0 ? "text-green-600" : "text-red-600"
													}`}>
													{evolution > 0 ? "+" : ""}
													{evolution}
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</Section>

						<Section className="mb-8 bg-white rounded-lg shadow-sm p-6">
							<Heading
								as="h2"
								className="text-2xl font-semibold mb-4 text-gray-700">
								Recommandations
							</Heading>
							<ul className="list-disc pl-5 space-y-2">
								{datastate?.map((item, index) => {
									const evolution = item.prediction - item.used;
									const lastaudit =
										item.historicalData[item.historicalData.length - 1];
									const difference =
										item.used - getUsageForDate(item, lastaudit.date);
									const expirationDate = new Date(item.expiryDate);
									const threeMonthsFromNow = addMonths(new Date(), 3);
									const isExpiringSoon = isBefore(
										expirationDate,
										threeMonthsFromNow
									);

									if (evolution > 10 || difference > 10) {
										return (
											<li key={index}>
												<Text>
													<strong className="text-blue-600">
														Planification:
													</strong>{" "}
													Envisagez d'augmenter les licences pour {item.name}.
												</Text>
											</li>
										);
									} else if (evolution < -10 || difference < -10) {
										return (
											<li key={index}>
												<Text>
													<strong className="text-green-600">
														Optimisation:
													</strong>{" "}
													Envisagez de réduire les licences pour {item.name}.
													L'utilisation a diminué de {Math.abs(difference)}{" "}
													depuis le dernier audit et devrait encore baisser de{" "}
													{Math.abs(evolution)} l'année prochaine.
												</Text>
											</li>
										);
									}
									if (isExpiringSoon) {
										return (
											<li key={`${index}-expiration`}>
												<Text>
													<strong className="text-yellow-600">
														Expiration:
													</strong>{" "}
													La licence pour {item.name} expire le{" "}
													{format(expirationDate, "dd/MM/yyyy")}. Prévoyez son
													renouvellement.
												</Text>
											</li>
										);
									}
									return null;
								})}
								{datastate?.find(
									(item) => item.used / item.allocated > 0.9
								) && (
									<li>
										<Text>
											<strong className="text-red-600">Attention:</strong>{" "}
											Certains logiciels approchent de leur limite d'allocation.
											Surveillez de près leur utilisation.
										</Text>
									</li>
								)}
							</ul>
						</Section>

						<Section className="bg-white rounded-lg shadow-sm p-6">
							<Text className="text-gray-600 text-sm mb-4">
								Ce rapport a été généré automatiquement. Pour toute question,
								veuillez contacter l'équipe IT.
							</Text>
							<Button
								href="https://example.com/dashboard"
								className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
								Accéder au tableau de bord
							</Button>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default ModernLicenseReportEmail;
