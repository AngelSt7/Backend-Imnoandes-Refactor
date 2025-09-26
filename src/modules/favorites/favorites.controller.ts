import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { Auth, GetUser } from '@/modules/auth/decorators';
import { User } from 'generated/prisma';

@Controller('favorites')
@Auth()
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) { }

  @Post(

  )
  create(
    @GetUser('id', ParseUUIDPipe) userId: User['id'],
    @Body() createFavoriteDto: CreateFavoriteDto
  ) {
    return this.favoritesService.create(userId, createFavoriteDto);
  }

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoritesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFavoriteDto: UpdateFavoriteDto) {
    return this.favoritesService.update(+id, updateFavoriteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoritesService.remove(+id);
  }
}
