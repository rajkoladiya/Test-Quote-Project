/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement } from "lwc";

export default class quoteTotalSummary extends LightningElement {

    handleClick(event) {
        const adjustEvent = new CustomEvent('adjustquote');
        this.dispatchEvent(adjustEvent);
    }
}
