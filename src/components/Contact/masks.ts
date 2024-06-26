export const formatPhoneNumber = (value: string | undefined) => {
	if (!value) return "";

	return value
		.replace(/[\D]/g, "")
		.replace(/(\d{2})(\d)/, "($1) $2")
		.replace(/(\d{5})(\d)/, "$1-$2")
		.replace(/(-\d{4})(\d+?)/, "$1");
};

export const formatCnpjNumber = (value: string | undefined) => {
	if (!value) return "";

	return value
		.replace(/[\D]/g, "")
		.replace(/(\d{2})(\d)/, "$1.$2")
		.replace(/(\d{3})(\d)/, "$1.$2")
		.replace(/(\d{3})(\d)/, "$1/$2")
		.replace(/(\d{4})(\d)/, "$1-$2")
		.replace(/(-\d{2})\d+?$/, "$1");
};

export const formatCepNumber = (value: string | undefined) => {
	if (!value) return "";
	return value
		.replace(/\D/g, "")
		.replace(/^(\d{5})(\d{3})+?$/, "$1-$2")
		.replace(/(-\d{3})(\d+?)/, "$1");
};
