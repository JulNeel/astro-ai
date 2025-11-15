import { defaultLocale } from "@locales/i18n.config";
import {
  useTranslations,
  type TranslationKey,
} from "@locales/utils/useTranslations";
import { useEffect, useState } from "react";

export default function ContactForm({
  lang = defaultLocale,
}: {
  lang?: string;
}) {
  const [t, setT] = useState<(key: TranslationKey) => string | null>(
    () => () => null,
  );

  const [isLoaded, setIsLoaded] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    company: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    email: "",
    message: "",
  });

  const [touched, setTouched] = useState({
    firstName: false,
    email: false,
    message: false,
  });

  useEffect(() => {
    let isMounted = true;
    useTranslations(lang).then((fn) => {
      if (isMounted) {
        setT(() => fn);
        setIsLoaded(true);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [lang]);

  const validateField = (name: string, value: string) => {
    if (!isLoaded) return "";

    switch (name) {
      case "firstName":
        if (!value.trim()) {
          return t("contact-section.form.mandatory-field-message") || "";
        }
        return "";

      case "email":
        if (!value.trim()) {
          return t("contact-section.form.mandatory-field-message") || "";
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return t("contact-section.form.invalid-email-message") || "";
        }
        return "";

      case "message":
        if (!value.trim()) {
          return t("contact-section.form.mandatory-field-message") || "";
        }
        if (value.trim().length < 10) {
          return t("contact-section.form.minimum-length-field-message") || "";
        }
        return "";

      default:
        return "";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name as keyof typeof touched]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTouched({
      firstName: true,
      email: true,
      message: true,
    });

    const newErrors = {
      firstName: validateField("firstName", formData.firstName),
      email: validateField("email", formData.email),
      message: validateField("message", formData.message),
    };

    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error !== "");

    if (!hasErrors) {
      console.log("Pow pow pow ! Le formulaire marche !!!", formData);

      setFormData({
        firstName: "",
        email: "",
        company: "",
        message: "",
      });
      setTouched({
        firstName: false,
        email: false,
        message: false,
      });
    } else {
      console.log("Formulaire invalide, erreurs:", newErrors);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex flex-col gap-y-4">
        <div className="h-12 w-full animate-pulse rounded-md bg-gray-200"></div>
        <div className="h-12 w-full animate-pulse rounded-md bg-gray-200"></div>
        <div className="h-12 w-full animate-pulse rounded-md bg-gray-200"></div>
        <div className="h-32 w-full animate-pulse rounded-md bg-gray-200"></div>
        <div className="mx-auto h-14 w-64 animate-pulse rounded-lg bg-gray-200 lg:mr-0 lg:ml-auto"></div>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
      <div>
        <input
          className={`h-12 w-full rounded-md bg-white p-2 ${
            touched.firstName && errors.firstName
              ? "border-2 border-red-500"
              : ""
          }`}
          type="text"
          name="firstName"
          value={formData.firstName}
          placeholder={t("contact-section.form.first-name") || ""}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.firstName && errors.firstName && (
          <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
        )}
      </div>

      <div>
        <input
          className={`h-12 w-full rounded-md bg-white p-2 ${
            touched.email && errors.email ? "border-2 border-red-500" : ""
          }`}
          type="email"
          name="email"
          value={formData.email}
          placeholder={t("contact-section.form.email") || ""}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.email && errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      <input
        className="h-12 rounded-md bg-white p-2"
        type="text"
        name="company"
        value={formData.company}
        placeholder={t("contact-section.form.company") || ""}
        onChange={handleChange}
      />

      <div>
        <textarea
          className={`h-12 min-h-32 w-full rounded-md bg-white p-2 ${
            touched.message && errors.message ? "border-2 border-red-500" : ""
          }`}
          name="message"
          value={formData.message}
          placeholder={t("contact-section.form.message") || ""}
          onChange={handleChange}
          onBlur={handleBlur}
        ></textarea>
        {touched.message && errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="hover:bg-primary focus:ring-primary mx-auto inline-flex items-center justify-center rounded-lg bg-white px-32 py-4 text-xl font-semibold text-black transition-colors hover:text-white focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 lg:mr-0 lg:ml-auto"
      >
        {t("contact-section.form.submit")}
      </button>
    </form>
  );
}
