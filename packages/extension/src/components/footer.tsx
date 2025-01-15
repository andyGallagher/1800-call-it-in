import { useOrderContext } from "@/contexts/order/hooks";
import { clsx } from "clsx";
import { useState } from "react";
import styles from "./footer.module.css";

const FooterInput = ({
    id,
    label,
    value,
    onChange,
}: {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
}) => {
    return (
        <div className={styles.footerInputWrapper}>
            <label className={styles.footerInputLabel} htmlFor={id}>
                {label}
            </label>

            <div className={styles.footerInputDash} />

            <input
                id={id}
                className={styles.footerInput}
                value={value}
                onChange={(e) => {
                    onChange(e.target.value);
                }}
            />
        </div>
    );
};

export const Footer = () => {
    const { parsedMenuItems, placeOrder } = useOrderContext();
    const [orderDetails, setOrderDetails] = useState({
        userName: "Andrew Gallagher",
        userPhoneNumber: "+15555555555",
        restaurantPhoneNumber: "+15555555555",
    });

    const isDisabled =
        parsedMenuItems?.length === 0 ||
        !Object.values(orderDetails).every((value) => value);

    return (
        <div className={styles.footer}>
            <div className={styles.footerGlyphWrapper}>
                <svg
                    className={styles.footerGlyph}
                    fill="currentColor"
                    height="30px"
                    width="30px"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 59.5 59.5"
                >
                    <g>
                        <path
                            d="M59.5,31.75c0-1.933-1.942-3.513-5-4.174V24.25c0-0.064-0.005-0.127-0.013-0.196l0.001-0.025
		c0.006-0.093,0.012-0.185,0.012-0.278c0-4.687-3.813-8.5-8.5-8.5c-0.268,0-0.535,0.015-0.801,0.041
		c-0.131,0.012-0.259,0.034-0.388,0.053c-0.126,0.018-0.253,0.034-0.378,0.058c-0.165,0.031-0.326,0.07-0.488,0.111
		c-0.083,0.021-0.166,0.041-0.248,0.064c-0.181,0.051-0.358,0.109-0.533,0.171c-0.059,0.021-0.118,0.042-0.176,0.065
		c-0.186,0.071-0.369,0.147-0.549,0.231c-0.046,0.021-0.091,0.044-0.136,0.066c-0.186,0.09-0.368,0.185-0.546,0.288
		c-0.038,0.022-0.075,0.046-0.112,0.068c-0.181,0.109-0.359,0.221-0.531,0.342c-0.033,0.023-0.064,0.048-0.096,0.072
		c-0.174,0.127-0.346,0.257-0.51,0.396c-0.002,0.002-0.005,0.004-0.007,0.006c-1.53-1.3-3.485-2.03-5.5-2.03
		c-0.268,0-0.535,0.015-0.801,0.041c-0.131,0.012-0.259,0.034-0.388,0.053c-0.126,0.018-0.253,0.034-0.378,0.058
		c-0.165,0.031-0.326,0.07-0.488,0.111c-0.083,0.021-0.166,0.041-0.248,0.064c-0.181,0.051-0.358,0.109-0.533,0.171
		c-0.059,0.021-0.118,0.042-0.176,0.065c-0.186,0.071-0.369,0.147-0.549,0.231c-0.046,0.021-0.091,0.044-0.136,0.066
		c-0.186,0.09-0.368,0.185-0.546,0.288c-0.038,0.022-0.075,0.046-0.112,0.068c-0.181,0.109-0.359,0.221-0.531,0.342
		c-0.033,0.023-0.064,0.048-0.096,0.072c-0.174,0.127-0.346,0.257-0.51,0.396c-0.002,0.002-0.005,0.004-0.007,0.006
		c-1.366-1.161-3.072-1.863-4.856-2.001c-0.049-0.007-0.093-0.029-0.144-0.029c-0.08,0-0.157,0.01-0.236,0.012
		C24.176,15.259,24.089,15.25,24,15.25c-2.015,0-3.97,0.73-5.5,2.03c-1.53-1.3-3.485-2.03-5.5-2.03c-4.687,0-8.5,3.813-8.5,8.5
		c0,0.094,0.006,0.186,0.012,0.278l0.001,0.024C4.505,24.117,4.5,24.183,4.5,24.25v3.448C1.745,28.425,0,29.959,0,31.75
		c0,1.85,1.795,3.368,4.504,4.073C4.543,40.476,8.338,44.25,13,44.25h33c4.621,0,8.386-3.709,8.49-8.306
		C57.481,35.304,59.5,33.714,59.5,31.75z M6.5,23.75c0-3.584,2.916-6.5,6.5-6.5c1.673,0,3.23,0.631,4.44,1.774
		C16.531,20.376,16,22.002,16,23.75c0,0.553,0.447,1,1,1s1-0.447,1-1c0-3.499,2.782-6.354,6.249-6.487
		c1.443,0.054,2.79,0.573,3.889,1.492c-1.025,1.404-1.638,3.128-1.638,4.995c0,0.553,0.447,1,1,1s1-0.447,1-1
		c0-1.709,0.668-3.262,1.751-4.424c0.138-0.148,0.282-0.287,0.43-0.42c0.023-0.02,0.044-0.041,0.067-0.061
		c0.13-0.114,0.266-0.219,0.403-0.321c0.047-0.035,0.093-0.072,0.141-0.105c0.109-0.077,0.222-0.145,0.335-0.214
		c0.079-0.048,0.157-0.1,0.239-0.145c0.08-0.044,0.163-0.082,0.244-0.123c0.115-0.057,0.229-0.117,0.348-0.168
		c0.049-0.021,0.101-0.037,0.151-0.057c0.151-0.06,0.302-0.119,0.458-0.168c0.023-0.007,0.047-0.012,0.071-0.019
		c0.182-0.055,0.366-0.104,0.555-0.143c0.016-0.003,0.032-0.004,0.048-0.008c0.196-0.039,0.394-0.07,0.595-0.091
		c0.22-0.022,0.442-0.034,0.666-0.034c1.537,0,2.976,0.532,4.138,1.505c-1.025,1.404-1.638,3.128-1.638,4.995c0,0.553,0.447,1,1,1
		s1-0.447,1-1c0-1.709,0.668-3.262,1.751-4.424c0.138-0.148,0.282-0.287,0.43-0.42c0.023-0.02,0.044-0.041,0.067-0.061
		c0.13-0.114,0.266-0.219,0.403-0.321c0.047-0.035,0.093-0.072,0.141-0.105c0.109-0.077,0.222-0.145,0.335-0.214
		c0.079-0.048,0.157-0.1,0.239-0.145c0.08-0.044,0.163-0.082,0.244-0.123c0.115-0.057,0.229-0.117,0.348-0.168
		c0.049-0.021,0.101-0.037,0.151-0.057c0.151-0.06,0.302-0.119,0.458-0.168c0.023-0.007,0.047-0.012,0.071-0.019
		c0.182-0.055,0.366-0.104,0.555-0.143c0.016-0.003,0.032-0.004,0.048-0.008c0.196-0.039,0.394-0.07,0.595-0.091
		c0.22-0.022,0.442-0.034,0.666-0.034c3.584,0,6.5,2.916,6.5,6.5v4.412L52.49,28.3c-0.001,0.021-0.01,0.04-0.012,0.061
		c-0.013,0.114-0.039,0.225-0.087,0.324c-0.001,0.002-0.002,0.003-0.003,0.004c-0.054,0.109-0.126,0.207-0.213,0.289
		c-0.01,0.009-0.022,0.013-0.032,0.022c-0.081,0.071-0.17,0.133-0.27,0.174c-0.115,0.046-0.24,0.075-0.371,0.075h-2.754h-2.772
		h-8.228h-2.79h-9.21H22.96h-8.214h-2.79H7.5c-0.13,0-0.254-0.029-0.368-0.074c-0.067-0.027-0.123-0.072-0.182-0.113
		c-0.039-0.027-0.082-0.047-0.117-0.079c-0.067-0.062-0.121-0.138-0.169-0.218c-0.014-0.022-0.032-0.042-0.044-0.065
		c-0.043-0.085-0.068-0.18-0.086-0.278c-0.008-0.045-0.025-0.087-0.027-0.134L6.5,28.222v-3.943l0.019-0.173L6.5,23.75z
		 M47.903,32.126c-0.007,0.015-0.01,0.03-0.018,0.045c-0.056,0.108-0.144,0.218-0.239,0.328c-0.054,0.061-0.114,0.122-0.18,0.182
		c-0.07,0.065-0.148,0.129-0.231,0.192c-0.131,0.099-0.277,0.196-0.437,0.289c-0.048,0.028-0.096,0.056-0.146,0.083
		c-0.101,0.055-0.205,0.108-0.315,0.16c-0.586,0.272-1.264,0.483-1.998,0.626c-0.003,0-0.005,0.001-0.008,0.001
		c-0.355,0.069-0.723,0.121-1.1,0.157c-0.391,0.036-0.798,0.06-1.229,0.06c-0.302,0-0.601-0.014-0.896-0.035
		c-0.081-0.006-0.161-0.013-0.242-0.021c-0.233-0.021-0.462-0.048-0.688-0.082c-0.064-0.01-0.13-0.017-0.194-0.028
		c-0.28-0.046-0.553-0.101-0.816-0.166c-0.049-0.012-0.094-0.026-0.142-0.039c-0.214-0.056-0.421-0.118-0.621-0.186
		c-0.037-0.013-0.074-0.026-0.11-0.039c0.227-0.288,0.405-0.592,0.524-0.912c0.001-0.002,0.002-0.005,0.003-0.007
		c0.055-0.148,0.097-0.299,0.126-0.453c0.003-0.013,0.007-0.025,0.01-0.038C38.983,32.083,39,31.918,39,31.75
		c0-0.169-0.016-0.335-0.047-0.5h8.866c0.015,0.024,0.041,0.05,0.054,0.073c0.013,0.025,0.024,0.049,0.035,0.073
		C47.963,31.517,48,31.636,48,31.75C48,31.871,47.962,31.997,47.903,32.126z M29.875,34.195c-0.086-0.008-0.171-0.015-0.256-0.025
		c-0.358-0.039-0.708-0.089-1.043-0.157c-0.039-0.008-0.076-0.019-0.115-0.027c-0.303-0.065-0.593-0.143-0.87-0.23
		c-0.069-0.022-0.14-0.043-0.207-0.066c-0.293-0.1-0.57-0.211-0.823-0.335c-0.015-0.007-0.027-0.015-0.042-0.023
		c0.007-0.01,0.011-0.021,0.017-0.031c0.061-0.099,0.117-0.199,0.167-0.302c0.022-0.045,0.04-0.092,0.06-0.137
		c0.036-0.084,0.071-0.169,0.098-0.256c0.024-0.073,0.039-0.148,0.057-0.222c0.015-0.065,0.034-0.129,0.044-0.195
		C26.986,32.044,27,31.898,27,31.75c0-0.168-0.016-0.334-0.048-0.5h9.855c0.024,0.037,0.066,0.077,0.085,0.113
		c0.001,0.002,0.002,0.004,0.003,0.006C36.964,31.502,37,31.63,37,31.75c0,0.117-0.038,0.24-0.094,0.365
		c-0.024,0.052-0.062,0.106-0.096,0.159c-0.043,0.068-0.091,0.136-0.15,0.205c-0.061,0.071-0.128,0.141-0.204,0.21
		c-0.049,0.045-0.106,0.09-0.162,0.135c-0.103,0.082-0.207,0.165-0.33,0.243c-0.27,0.172-0.58,0.325-0.917,0.463
		c-0.051,0.021-0.104,0.042-0.157,0.062c-0.32,0.123-0.664,0.229-1.027,0.32c-0.035,0.009-0.067,0.019-0.103,0.027
		c-0.175,0.041-0.355,0.077-0.537,0.11c-0.254,0.046-0.511,0.089-0.787,0.12c-0.1,0.011-0.204,0.017-0.306,0.026
		c-0.363,0.031-0.734,0.055-1.13,0.055C30.618,34.25,30.244,34.227,29.875,34.195z M18.104,34.215
		c-0.081-0.006-0.161-0.013-0.242-0.021c-0.233-0.021-0.462-0.048-0.688-0.082c-0.064-0.01-0.13-0.017-0.194-0.028
		c-0.28-0.046-0.553-0.101-0.816-0.166c-0.049-0.012-0.094-0.026-0.142-0.039c-0.214-0.056-0.421-0.118-0.621-0.186
		c-0.037-0.013-0.074-0.026-0.11-0.039c0.227-0.288,0.405-0.592,0.524-0.912c0.001-0.002,0.002-0.005,0.003-0.007
		c0.055-0.148,0.097-0.299,0.126-0.453c0.003-0.013,0.007-0.025,0.01-0.038C15.983,32.083,16,31.918,16,31.75
		c0-0.169-0.016-0.335-0.047-0.5h8.859c0.02,0.032,0.055,0.065,0.072,0.096c0.006,0.012,0.011,0.024,0.017,0.035
		C24.963,31.509,25,31.633,25,31.75c0,0.116-0.038,0.239-0.094,0.363c-0.018,0.039-0.04,0.076-0.062,0.114
		c-0.051,0.088-0.117,0.177-0.194,0.266c-0.061,0.069-0.122,0.131-0.187,0.19c-0.055,0.051-0.119,0.101-0.182,0.151
		c-0.112,0.088-0.227,0.174-0.357,0.255c-0.032,0.02-0.071,0.04-0.105,0.06c-0.275,0.163-0.585,0.31-0.923,0.44
		c-0.053,0.021-0.102,0.043-0.157,0.063c-0.167,0.06-0.344,0.114-0.523,0.166c-0.102,0.03-0.209,0.057-0.316,0.084
		c-0.212,0.053-0.428,0.102-0.653,0.144c-0.241,0.044-0.488,0.084-0.749,0.114c-0.125,0.015-0.252,0.025-0.378,0.036
		c-0.36,0.03-0.727,0.055-1.12,0.055C18.698,34.25,18.399,34.236,18.104,34.215z M2,31.75c0-0.673,0.996-1.571,2.861-2.091
		c0.016,0.03,0.036,0.056,0.053,0.085c0.05,0.086,0.099,0.172,0.157,0.252c0.081,0.113,0.169,0.22,0.264,0.32
		c0.053,0.055,0.11,0.104,0.167,0.155c0.072,0.065,0.147,0.127,0.225,0.186c0.055,0.041,0.109,0.082,0.168,0.119
		c0.133,0.085,0.271,0.163,0.417,0.227c0.034,0.015,0.07,0.024,0.105,0.038c0.13,0.051,0.264,0.093,0.402,0.125
		c0.049,0.012,0.098,0.023,0.149,0.032C7.14,31.228,7.317,31.25,7.5,31.25h6.307c0.024,0.037,0.066,0.077,0.085,0.113
		c0.001,0.002,0.002,0.004,0.003,0.006C13.964,31.502,14,31.63,14,31.75c0,0.117-0.038,0.24-0.094,0.365
		c-0.024,0.052-0.062,0.106-0.096,0.159c-0.043,0.068-0.091,0.136-0.15,0.205c-0.061,0.071-0.128,0.141-0.204,0.21
		c-0.049,0.045-0.106,0.09-0.162,0.135c-0.103,0.082-0.207,0.165-0.33,0.243c-1.003,0.637-2.535,1.04-4.166,1.145
		c-0.083,0.005-0.166,0.009-0.251,0.012c-0.266,0.012-0.533,0.019-0.801,0.014c-0.13-0.002-0.251-0.012-0.378-0.018
		c-0.568-0.026-1.134-0.081-1.68-0.186l-0.337-0.065C3.235,33.496,2,32.515,2,31.75z M52.483,36.217
		c-0.24,3.367-3.057,6.033-6.483,6.033H13c-3.441,0-6.267-2.688-6.486-6.075c0.278,0.027,0.563,0.046,0.852,0.058
		c0.095,0.004,0.19,0.005,0.286,0.008C7.768,36.243,7.882,36.25,8,36.25c0.091,0,0.178-0.006,0.268-0.007
		c0.093-0.002,0.186-0.004,0.279-0.007c0.274-0.01,0.544-0.026,0.808-0.049c0.001,0,0.002,0,0.003,0
		c1.615-0.144,3.037-0.539,4.148-1.12c0.005,0.003,0.011,0.004,0.016,0.007c0.328,0.169,0.686,0.318,1.06,0.453
		c0.059,0.021,0.116,0.044,0.176,0.064c0.37,0.126,0.759,0.234,1.164,0.325c0.071,0.016,0.142,0.031,0.213,0.045
		c0.412,0.085,0.836,0.155,1.273,0.202c0.06,0.007,0.121,0.01,0.181,0.016c0.462,0.044,0.931,0.073,1.409,0.073
		c2.446,0,4.562-0.56,6.005-1.471c0.19,0.119,0.393,0.232,0.605,0.338c0.057,0.029,0.12,0.053,0.179,0.081
		c0.172,0.081,0.347,0.16,0.53,0.232c0.09,0.035,0.184,0.067,0.276,0.1c0.162,0.058,0.326,0.115,0.496,0.167
		c0.104,0.032,0.21,0.06,0.317,0.089c0.168,0.046,0.338,0.089,0.512,0.128c0.112,0.025,0.224,0.049,0.338,0.072
		c0.18,0.036,0.363,0.066,0.548,0.095c0.112,0.017,0.223,0.035,0.336,0.05c0.204,0.026,0.411,0.045,0.62,0.063
		c0.099,0.008,0.197,0.02,0.297,0.026c0.31,0.02,0.624,0.031,0.941,0.031c2.177,0,4.093-0.445,5.507-1.185
		c0.005,0.003,0.011,0.004,0.016,0.007c0.328,0.169,0.686,0.318,1.06,0.453c0.059,0.021,0.116,0.044,0.176,0.064
		c0.37,0.126,0.759,0.234,1.164,0.325c0.071,0.016,0.142,0.031,0.213,0.045c0.412,0.085,0.836,0.155,1.273,0.202
		c0.06,0.007,0.121,0.01,0.181,0.016c0.462,0.044,0.931,0.073,1.409,0.073c0.416,0,0.819-0.021,1.215-0.053
		c0.038-0.003,0.075-0.006,0.113-0.009c1.289-0.112,2.456-0.383,3.441-0.783c0.099,0.04,0.214,0.066,0.317,0.103
		c0.234,0.085,0.47,0.164,0.718,0.235c0.182,0.052,0.366,0.098,0.555,0.142c0.26,0.061,0.523,0.113,0.794,0.158
		c0.198,0.033,0.395,0.063,0.598,0.088c0.27,0.033,0.541,0.055,0.817,0.073c0.216,0.014,0.429,0.027,0.647,0.031
		c0.096,0.002,0.189,0.014,0.286,0.014c0.331,0,0.655-0.013,0.974-0.033C52.477,36.217,52.48,36.217,52.483,36.217z M53.122,34.14
		c-0.155,0.02-0.31,0.039-0.466,0.053c-0.34,0.03-0.691,0.049-1.061,0.052c-0.098,0.001-0.195-0.004-0.293-0.005
		c-0.289-0.004-0.574-0.02-0.856-0.043c-0.112-0.01-0.225-0.016-0.335-0.028c-0.328-0.036-0.648-0.088-0.959-0.149
		c-0.05-0.01-0.098-0.022-0.148-0.033c0.001-0.001,0.001-0.001,0.002-0.002c0.151-0.155,0.288-0.315,0.406-0.482
		c0.027-0.037,0.046-0.076,0.071-0.114c0.081-0.123,0.154-0.249,0.216-0.377c0.03-0.061,0.055-0.123,0.08-0.185
		c0.048-0.117,0.086-0.237,0.118-0.358c0.015-0.058,0.033-0.115,0.045-0.174C49.977,32.117,50,31.936,50,31.75
		c0-0.168-0.016-0.335-0.047-0.5H51.5c0.181,0,0.358-0.022,0.531-0.054c0.059-0.01,0.116-0.025,0.174-0.039
		c0.112-0.028,0.221-0.062,0.328-0.102c0.064-0.023,0.128-0.044,0.189-0.072c0.134-0.061,0.263-0.13,0.386-0.21
		c0.085-0.054,0.162-0.117,0.24-0.179c0.046-0.036,0.091-0.072,0.135-0.111c0.082-0.073,0.159-0.148,0.233-0.229
		c0.023-0.025,0.043-0.052,0.065-0.078c0.158-0.187,0.293-0.39,0.402-0.611c0.004-0.007,0.009-0.014,0.012-0.021
		c2.086,0.479,3.305,1.444,3.305,2.206C57.5,32.631,55.862,33.795,53.122,34.14z"
                        />
                        <circle cx="12" cy="38.25" r="1" />
                        <circle cx="17" cy="40.25" r="1" />
                        <circle cx="21" cy="38.25" r="1" />
                        <circle cx="24" cy="40.25" r="1" />
                        <circle cx="28" cy="38.25" r="1" />
                        <circle cx="32" cy="40.25" r="1" />
                        <circle cx="36" cy="37.25" r="1" />
                        <circle cx="39" cy="40.25" r="1" />
                        <circle cx="44" cy="38.25" r="1" />
                        <circle cx="48" cy="39.25" r="1" />
                    </g>
                </svg>
            </div>

            <div className={styles.footerActions}>
                <FooterInput
                    id="name"
                    label="Your name"
                    value={orderDetails.userName}
                    onChange={(userName) => {
                        setOrderDetails((orderDetails) => ({
                            ...orderDetails,
                            userName,
                        }));
                    }}
                />

                <FooterInput
                    id="your-phone"
                    label="Your phone"
                    value={orderDetails.userPhoneNumber}
                    onChange={(userPhoneNumber) => {
                        setOrderDetails((orderDetails) => ({
                            ...orderDetails,
                            userPhoneNumber,
                        }));
                    }}
                />

                <FooterInput
                    id="their-phone"
                    label="Their phone"
                    value={orderDetails.restaurantPhoneNumber}
                    onChange={(restaurantPhoneNumber) => {
                        setOrderDetails((orderDetails) => ({
                            ...orderDetails,
                            restaurantPhoneNumber,
                        }));
                    }}
                />

                <button
                    disabled={isDisabled}
                    className={clsx(
                        styles.footerOrderButton,
                        isDisabled && styles.disabled,
                    )}
                    onClick={() => {
                        if (isDisabled) {
                            return;
                        }

                        placeOrder(orderDetails);
                    }}
                >
                    <span
                        className={clsx(
                            styles.footerOrderButtonGlyph,
                            isDisabled && styles.disabled,
                        )}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1.003 1.003 0 011.11-.27c1.12.45 2.33.69 3.59.69.55 0 1 .45 1 1v3.5c0 .55-.45 1-1 1C10.29 22 2 13.71 2 3.5 2 2.95 2.45 2.5 3 2.5H6.5c.55 0 1 .45 1 1 0 1.26.24 2.47.69 3.59.14.36.06.77-.27 1.11l-2.2 2.2z" />
                        </svg>
                    </span>
                    <span className={styles.footerOrderButtonText}>
                        Call it in
                    </span>
                </button>
            </div>

            <p className={styles.footerCopyright}>© 2025 1-800-call-it-in</p>
        </div>
    );
};
