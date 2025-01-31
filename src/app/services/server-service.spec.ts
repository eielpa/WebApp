import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ServerService } from './server-service';


describe('ServerService', () => {
  let service: ServerService;
  let httpMock: HttpTestingController;

  // Configurazione del TestBed
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importiamo il modulo per il test delle chiamate HTTP
      providers: [ServerService],
    });
    service = TestBed.inject(ServerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // Testiamo il metodo getData
  it('should retrieve data from the server', () => {
    const mockData = { id: 1, name: 'Test Data' };

    // Chiamata al metodo getData
    service.getData('data').subscribe((data: any) => {
      expect(data).toEqual(mockData); // Verifica che i dati siano corretti
    });

    // Mock della risposta HTTP
    const req = httpMock.expectOne('https://api.example.com/data');
    expect(req.request.method).toBe('GET'); // Verifica che sia stata effettuata una GET
    req.flush(mockData); // Simula una risposta con mockData
  });

  // Testiamo il metodo postData
  it('should send data to the server', () => {
    const mockData = { id: 1, name: 'Test Data' };
    const postData = { id: 1, name: 'New Data' };

    // Chiamata al metodo postData
    service.postData('data', postData).subscribe((response: any) => {
      expect(response).toEqual(mockData); // Verifica che la risposta sia quella che ci aspettiamo
    });

    // Mock della richiesta HTTP
    const req = httpMock.expectOne('https://api.example.com/data');
    expect(req.request.method).toBe('POST'); // Verifica che sia stata effettuata una POST
    expect(req.request.body).toEqual(postData); // Verifica che i dati inviati siano corretti
    req.flush(mockData); // Simula la risposta con mockData
  });

  // Dopo ogni test, verifichiamo che non ci siano richieste pendenti
  afterEach(() => {
    httpMock.verify();
  });
});
