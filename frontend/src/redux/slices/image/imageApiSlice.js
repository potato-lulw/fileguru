import { apiSlice } from "../apislice";

export const imageApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getImageFormats: builder.query({
            query: () => '/image/formats',
        }),
        convertImage: builder.mutation({
            query: ({ file, format }) => {
                const formData = new FormData();
                formData.append("image", file);
                formData.append("format", format);

                return {
                    url: "/image/convert",
                    method: "POST",
                    body: formData,
                    // Use a custom response handler to return a Blob
                    responseHandler: (response) => response.blob(),
                };
            }
        }),
    }),
});

export const { useGetImageFormatsQuery, useConvertImageMutation } = imageApiSlice;