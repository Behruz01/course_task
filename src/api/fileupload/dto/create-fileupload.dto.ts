import { ApiProperty } from '@nestjs/swagger';

export class FileUploadDto {
    @ApiProperty({
        description: 'Image files',
        type: 'array',
        items: {
            type: 'string',
            format: 'binary',
        },
    })
    files: any[];
}
