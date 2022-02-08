export const handleResponse = ({ success, ...rest }) => ({ success, ...rest });

export const mapSelectData = (data) => (Array.isArray(data) ? data.filter((item) => item != null).map((item) => ({ value: item, label: item })) : []);
