import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ProvinceService } from './province.service';
import { Department } from 'generated/prisma';
import { Cached } from '@decorators/cache/cached.decorator';
import { CACHE_KEYS } from 'src/cache/cache-keys';

@Controller('province')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) { }

  @Get(':departmentId')
  @Cached(CACHE_KEYS.PROVINCES_TO_DEPARTMENT)
  async findAll(
    @Param('departmentId', ParseUUIDPipe) departmentId: Department['id']
  ) {
    return await this.provinceService.findAll(departmentId);
  }

  @Post('/direcciones')
  async getDirections(@Body('address') direcciones: string[]) {
    const resultados: { add: string; lat: number; lng: number }[] = [];

    async function getLatLng(address: string) {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`
      );
      const data = await res.json();
      if (data.length > 0) {
        return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
      }
      return { lat: 0, lng: 0 };
    }

    for (const dir of direcciones) {
      const coords = await getLatLng(dir);
      resultados.push({ add: dir, ...coords });
      console.log(`✅ ${dir} -> ${coords.lat}, ${coords.lng}`);
      await new Promise(r => setTimeout(r, 1000)); // pausa entre requests
    }

    return resultados;
  }

}
