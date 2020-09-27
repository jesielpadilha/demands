import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BillService } from '../services/bill.service';

@Component({
  selector: 'app-payment-component',
  templateUrl: './payment.component.html'
})
export class PaymentComponent implements OnInit {

  @Output() cancelPayment = new EventEmitter()
  @Input() billData: any
  form: FormGroup

  paymentMethods: any[] = [
    { id: 1, value: "Cash" },
    { id: 2, value: "Debit Card" },
    { id: 3, value: "Credit Card" },
  ]

  constructor(private formBuilder: FormBuilder, private billService: BillService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      paymentMethod: new FormControl('', Validators.required),
    })
  }

  cancel() {
    this.cancelPayment.emit()
  }

  pay(form) {
    if (this.form.valid) {
      this.billService.closeBill({
        billId: this.billData.billId,
        paymentMethod: form.paymentMethod
      }).subscribe(res => {
        if (res == false) {
          alert('Fail to close the bill')
        } else {
          console.log(res)
          this.cancelPayment.emit()
        }
      })
    }
  }
}
