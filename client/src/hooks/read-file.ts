export interface FileData {
    fileContent: string;
    fileName: string;
}

interface ReadFileState {
    data: FileData;
    error: Error | null;
    loading: boolean;
}

export async function useReadFile(path: string): Promise<ReadFileState> {
    const state: ReadFileState = {
        data: {
            fileContent: '',
            fileName: path.split('/').pop() || '',
        },
        error: null,
        loading: true,
    }

    async function loadContent() {
        fetch(path)
            .then(async (response) => {
                if (response.ok) {
                    state.data.fileContent = await response.text();
                } else {
                    state.error = new Error(response.statusText);
                }
            })
            .catch(error => {
                state.error = error;
            })
            .finally(() => {
                state.loading = false;
            });
    }

    await loadContent();

    return state;
}
