export function cleanDto(dto: any): any {
    const cleanedDto = {};
    Object.keys(dto).forEach(key => {
        if (dto[key] !== null && dto[key] !== undefined && dto[key].trim() !== '') {
            cleanedDto[key] = dto[key];
        }
    });
    return cleanedDto;
}