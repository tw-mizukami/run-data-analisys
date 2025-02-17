import { useEffect, useState } from "react";
import { Locale } from "@/i18n-config";
import { getDictionary } from "../get-dictionary";

export const useDictionary = (params: Promise<{ lang: Locale }>) => {
    const [dictionary, setDictionary] = useState<any>(null);
    const [lang, setLang] = useState<string | null>(null);

    useEffect(() => {
        const fetchDictionary = async () => {
            try {
                const resolvedParams = await params;
                const { lang } = resolvedParams;
                setLang(lang);
                const result = await getDictionary(lang);
                setDictionary(result);
            } catch (error) {
                console.error("Failed to fetch dictionary:", error);
            }
        };

        fetchDictionary();
    }, [params]);

    return { dictionary, lang};
};
