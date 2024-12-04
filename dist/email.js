import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Body, Button, Container, Head, Heading, Html, Img, Preview, Section, Tailwind, Text, } from "@react-email/components";
import { addMonths, format, isBefore } from "date-fns";
import { useEffect, useState } from "react";
export const ModernLicenseReportEmail = ({ data }) => {
    const [datastate, setData] = useState(data);
    const getUsageForDate = (data, date) => {
        const historicalUsage = data.historicalData.find((data) => data.date.getTime() === date.getTime());
        return historicalUsage ? historicalUsage.used : data.used;
    };
    useEffect(() => {
        setData(data);
    }, [data]);
    const getAnomalyColor = (anomaly) => {
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
    return (_jsxs(Html, { children: [_jsx(Head, {}), _jsx(Preview, { children: "Rapport de Licences Logicielles - R\u00E9sum\u00E9 et Recommandations" }), _jsx(Tailwind, { children: _jsx(Body, { className: "bg-gray-50 font-sans", children: _jsxs(Container, { className: "mx-auto py-8 px-4", children: [_jsx(Img, { src: "https://example.com/logo.png", width: "150", height: "50", alt: "Logo de l'entreprise", className: "mb-6" }), _jsx(Heading, { as: "h1", className: "text-3xl font-bold mb-6 text-gray-800", children: "Rapport de Licences Logicielles" }), _jsxs(Section, { className: "mb-8 bg-white rounded-lg shadow-sm p-6", children: [_jsx(Heading, { as: "h2", className: "text-2xl font-semibold mb-4 text-gray-700", children: "Vue d'ensemble" }), _jsxs("table", { className: "w-full border-collapse", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { className: "bg-gray-100 p-3 text-left rounded-tl-lg", children: "Logiciel" }), _jsx("th", { className: "bg-gray-100 p-3 text-left", children: "Licences allou\u00E9es" }), _jsx("th", { className: "bg-gray-100 p-3 text-left rounded-tr-lg", children: "Licences utilis\u00E9es" })] }) }), _jsx("tbody", { children: datastate?.map((item, index) => (_jsxs("tr", { className: index % 2 === 0 ? "bg-gray-50" : "bg-white", children: [_jsx("td", { className: "p-3 border-t", children: item.name }), _jsx("td", { className: "p-3 border-t", children: item.allocated }), _jsx("td", { className: "p-3 border-t", children: item.used })] }, index))) })] })] }), _jsxs(Section, { className: "mb-8 bg-white rounded-lg shadow-sm p-6", children: [_jsx(Heading, { as: "h2", className: "text-2xl font-semibold mb-4 text-gray-700", children: "Anomalies" }), _jsxs("table", { className: "w-full border-collapse", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { className: "bg-gray-100 p-3 text-left rounded-tl-lg", children: "Licences" }), _jsx("th", { className: "bg-gray-100 p-3 text-left rounded-tr-lg", children: "Anomalie" })] }) }), _jsx("tbody", { children: datastate?.map((item, index) => item.anomaly &&
                                                    item.anomaly.length > 0 && (_jsxs("tr", { className: index % 2 === 0 ? "bg-gray-50" : "bg-white", children: [_jsx("td", { className: "p-3 border-t", children: item.name }), _jsx("td", { className: "p-3 border-t", children: item.anomaly.map((anomaly) => (_jsx(Text, { className: `${getAnomalyColor(anomaly)} px-3 py-1 rounded-full mr-2 inline-block text-sm`, children: anomaly === "overused"
                                                                    ? "Surutilisation"
                                                                    : anomaly === "underused"
                                                                        ? "Sous-utilisation"
                                                                        : anomaly === "expiredsoon"
                                                                            ? "Expiration imminente"
                                                                            : anomaly === "stronggrowth"
                                                                                ? "Croissance forte"
                                                                                : anomaly === "strongdecrease"
                                                                                    ? "Diminution forte"
                                                                                    : "" }, anomaly))) })] }, index))) })] })] }), _jsxs(Section, { className: "mb-8 bg-white rounded-lg shadow-sm p-6", children: [_jsx(Heading, { as: "h2", className: "text-2xl font-semibold mb-4 text-gray-700", children: "Pr\u00E9dictions" }), _jsxs("table", { className: "w-full border-collapse", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { className: "bg-gray-100 p-3 text-left rounded-tl-lg", children: "Logiciel" }), _jsx("th", { className: "bg-gray-100 p-3 text-left", children: "Utilisation actuelle" }), _jsx("th", { className: "bg-gray-100 p-3 text-left", children: "Pr\u00E9diction \u00E0 1 an" }), _jsx("th", { className: "bg-gray-100 p-3 text-left rounded-tr-lg", children: "\u00C9volution" })] }) }), _jsx("tbody", { children: datastate?.map((item, index) => {
                                                    const evolution = item.prediction - item.used;
                                                    return (_jsxs("tr", { className: index % 2 === 0 ? "bg-gray-50" : "bg-white", children: [_jsx("td", { className: "p-3 border-t", children: item.name }), _jsx("td", { className: "p-3 border-t", children: item.used }), _jsx("td", { className: "p-3 border-t", children: item.prediction }), _jsxs("td", { className: `p-3 border-t ${evolution > 0 ? "text-green-600" : "text-red-600"}`, children: [evolution > 0 ? "+" : "", evolution] })] }, index));
                                                }) })] })] }), _jsxs(Section, { className: "mb-8 bg-white rounded-lg shadow-sm p-6", children: [_jsx(Heading, { as: "h2", className: "text-2xl font-semibold mb-4 text-gray-700", children: "Recommandations" }), _jsxs("ul", { className: "list-disc pl-5 space-y-2", children: [datastate?.map((item, index) => {
                                                const evolution = item.prediction - item.used;
                                                const lastaudit = item.historicalData[item.historicalData.length - 1];
                                                const difference = item.used - getUsageForDate(item, lastaudit.date);
                                                const expirationDate = new Date(item.expiryDate);
                                                const threeMonthsFromNow = addMonths(new Date(), 3);
                                                const isExpiringSoon = isBefore(expirationDate, threeMonthsFromNow);
                                                if (evolution > 10 || difference > 10) {
                                                    return (_jsx("li", { children: _jsxs(Text, { children: [_jsx("strong", { className: "text-blue-600", children: "Planification:" }), " ", "Envisagez d'augmenter les licences pour ", item.name, "."] }) }, index));
                                                }
                                                else if (evolution < -10 || difference < -10) {
                                                    return (_jsx("li", { children: _jsxs(Text, { children: [_jsx("strong", { className: "text-green-600", children: "Optimisation:" }), " ", "Envisagez de r\u00E9duire les licences pour ", item.name, ". L'utilisation a diminu\u00E9 de ", Math.abs(difference), " ", "depuis le dernier audit et devrait encore baisser de", " ", Math.abs(evolution), " l'ann\u00E9e prochaine."] }) }, index));
                                                }
                                                if (isExpiringSoon) {
                                                    return (_jsx("li", { children: _jsxs(Text, { children: [_jsx("strong", { className: "text-yellow-600", children: "Expiration:" }), " ", "La licence pour ", item.name, " expire le", " ", format(expirationDate, "dd/MM/yyyy"), ". Pr\u00E9voyez son renouvellement."] }) }, `${index}-expiration`));
                                                }
                                                return null;
                                            }), datastate?.find((item) => item.used / item.allocated > 0.9) && (_jsx("li", { children: _jsxs(Text, { children: [_jsx("strong", { className: "text-red-600", children: "Attention:" }), " ", "Certains logiciels approchent de leur limite d'allocation. Surveillez de pr\u00E8s leur utilisation."] }) }))] })] }), _jsxs(Section, { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx(Text, { className: "text-gray-600 text-sm mb-4", children: "Ce rapport a \u00E9t\u00E9 g\u00E9n\u00E9r\u00E9 automatiquement. Pour toute question, veuillez contacter l'\u00E9quipe IT." }), _jsx(Button, { href: "https://example.com/dashboard", className: "bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300", children: "Acc\u00E9der au tableau de bord" })] })] }) }) })] }));
};
export default ModernLicenseReportEmail;
//# sourceMappingURL=email.js.map