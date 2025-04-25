export const startEngine = async (id: number) => {
    const res = await fetch(`/engine?id=${id}&status=started`, { method: 'PATCH' });
    if (!res.ok) throw new Error('Failed to start engine');
    return await res.json(); 
};

export const stopEngine = async (id: number) => {
    const res = await fetch(`/engine?id=${id}&status=stopped`, { method: 'PATCH' });
    if (!res.ok) throw new Error('Failed to stop engine');
    return await res.json();
};

export const drive = async (id: number) => {
    const res = await fetch(`/engine?id=${id}&status=drive`, { method: 'PATCH' });
    if (res.status === 500) return 'stopped'; 
    if (!res.ok) throw new Error('Failed to drive');
    return 'success'; 
};
