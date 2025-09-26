import { apiSlice } from "../apislice";

export const audioApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAudioFormats: builder.query({
            query: () => '/audio/formats',
        }),
        convertAudio: builder.mutation({
            query: ({ file, format }) => {
                const formData = new FormData();
                formData.append('audio', file);
                formData.append('format', format);
                return {
                    url: '/audio/convert',
                    method: 'POST',
                    body: formData,
                }
            },
            responseHandler: async (response) => {
                // handle download stream (converted file)
                const blob = await response.blob();
                return blob;
            },
        })
    })
})


export const { useGetAudioFormatsQuery, useConvertAudioMutation } = audioApiSlice