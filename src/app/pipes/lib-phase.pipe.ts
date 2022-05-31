import { DemandeCreditService } from './../services/demande-credit.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'libPhase'
})
export class LibPhasePipe implements PipeTransform {
  constructor(private creditService: DemandeCreditService) {}

  async transform(id: number) {
    const result: any = await this.creditService
        .getPhaseById(id)
        .toPromise();

    if (result) {
        return result.etape;
    } else {
        return null;
    }
}
}
